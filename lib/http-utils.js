var swaggerHttpUtils = function (utils) {
  this.utils = utils;
  /**
   * Performs a call to the server using the funciton _constructUrl to get the url where to call
   * @method _call
   * @private
   * @param  {[type]}          callOptions [description]
   * @return {[type]}                      [description]
   */
  this.call = function (callOptions) {
    // if(!utils.validateCallParams(callOptions.requiredParams, callOptions.params)){
      // @TODO: make a proper error handler
      // return false;
    // }
    var callDefaultOptions = {
        method: 'GET',
        url : "/",
        async: true,
        callback: function () { return true; },
        callbackError: function () { return true; },
        callbackConnectionError: function(status_code){
          console.error("Connection error with the server. Status code:" + status_code);
        }
    };

    var options = utils.deepExtend({}, callDefaultOptions, callOptions);
    /*
        SETTING UP AND OPENING THE REQUEST
     */
    var request = new XMLHttpRequest();
    request.onload = function () {
      var resp;
      if (request.status >= 200 && request.status < 400) {
        // Success!
        resp = request.responseText;
        options.callback(resp,request.status);
      } else {
        // We reached our target server, but it returned an error
        resp = request.responseText;
        options.callbackError(resp, request.status);
      }
    };

    request.onerror = function () {
        options.callbackConnectionError(request.status);
    };

    /*
        END SETTING UP AND OPENING THE REQUEST
    */

    /* small changes if is a get or post request */
    if(options.method === 'GET'){
      /* We use the params as a url params and we remove it because it will be user as a header params in the call method */
      options.url = this.constructUrl(options, options.params);
      request.open(options.method, options.url, options.async);
      options.params = {};
    }else{
      /* We construct the url without params. */
      options.url = this.constructUrl(options);
      request.open(options.method, options.url, options.async);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    var encodedParams = this.encodeParamsToSend(options.params);
    request.send(encodedParams);
  };
  /**
   * Constructs a url based in the basePath, endpoint, apiVersion setted as a config, and the action received as a param.
   *   If it receives any url param, it will be setted in a GET mode.
   *   *** this coule be improved with multiple customized functionalities, like subdomains, friendly urls, etc
   * @method _constructUrl
   * @private
   * @param  {object}          options   The options that will be used to contruct the url. The required attributes are:
   *                                     basePath
   *                                     endpoint
   *                                     apiVersion
   *                                     action
   * @param  {object}          urlParams The object containing the relation between attr name and value that will be added as a get params
   * @return {string}                    A strinc with the url. The format will be:
   *                                       hotname/endPoint/api/apiVersion/action?param1=value1?paramN=valueN
   */
  this.constructUrl = function(options, urlParams){
    var basePath = options.basePath;
    var url = options.url ? options.url : "";

    if(!basePath){
      console.error("No basePath provided");
      return;
    }
    var endPoint = options.endPoint?"/"+options.endPoint:"";
    var apiVersion = options.apiVersion?"/"+options.apiVersion:"";
    url = basePath + url + endPoint + apiVersion;
    urlParams = urlParams || {};

    /* in the case that it have param for the url we add it in the most simple way */
    if (urlParams !== {}){
      url += "?";
      url += this.encodeParamsToSend(urlParams);
    }
    return url;
  };
  /************************************************
                COMMUNICATION BASED UTILS
  ************************************************/
  /**
   * Function that converts a simple object to a list of params to send to any call (get or post)
   * @method _encodeParamsToSend
   * @private
   * @param  {object}          params the simple (one level) object containing the key and the value of the param
   * @return {string}                 The params encoded for being sent (param1=value1&param2=value2 ... )
   */
  this.encodeParamsToSend = function(params){
    var encodedParams = "";
    for(var paramName in params){
      encodedParams += paramName + "=" + params[paramName]+ "&";
    }
    encodedParams = encodedParams.substring(0,encodedParams.length-1);
    return encodedParams;
  };

  /**
   * Validates the params
     * @TODO: Add more information about the required params and make more validations, like tipe, minval, etc.
   * @method _validateCallParams
   * @private
   * @param  {arary}     requiredParams The list of required params for this call
   * @param  {object}          params   The object containing key : value
   * @return {boolean}                    If params pass the validation or not
   */
  this.validateCallParams = function(requiredParams, params){
    /**
     * Validating that the call is properly done.
     */
     for (var i = requiredParams.length - 1; i >= 0; i--) {
       var requiredParam = requiredParams[i];
       if (params[requiredParam] === undefined){
        console.error("The param " + requiredParam + " is required");
        return false;
       }
     }
     return true;
  };
  return this;
};