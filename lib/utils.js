var swaggerUtils = function () {
  /************************************************
                  BASIC JS UTIL
  ************************************************/
  /**
   * Extends into the target the provided objects
   * Source : http://youmightnotneedjquery.com/
   *
   * @method _deepExtend
   * @private
   * @param  {object}     out     The target of the merge
   * @param  {object}     arg1    An object containing additional properties to merge in.
   * @param  {object}     argN    Additional objects containing properties to merge in.
   * @return {object}             The object result of the merge
   */
  this.deepExtend = function (out) {
      for (var i = 1; i < arguments.length; i++) {
          var obj = arguments[i];
          if(Object.prototype.toString.call(obj) === '[object Array]'){
            out = out || [];
          }else{
            out = out || {};
          }

          if (!obj)
            continue;

          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] === 'object')
                 out[key] = this.deepExtend(out[key], obj[key]);
              else
                if(Object.prototype.toString.call(out) === '[object Array]'){
                  out.push(obj[key]);
                }else{
                  out[key] = obj[key];
                }
            }
          }
      }
      return out;
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
   * Constructs a url based in the hostname, endpoint, apiVersion setted as a config, and the action received as a param.
   *   If it receives any url param, it will be setted in a GET mode.
   *   *** this coule be improved with multiple customized functionalities, like subdomains, friendly urls, etc
   * @method _constructUrl
   * @private
   * @param  {object}          options   The options that will be used to contruct the url. The required attributes are:
   *                                     hostname
   *                                     endpoint
   *                                     apiVersion
   *                                     action
   * @param  {object}          urlParams The object containing the relation between attr name and value that will be added as a get params
   * @return {string}                    A strinc with the url. The format will be:
   *                                       hotname/endPoint/api/apiVersion/action?param1=value1?paramN=valueN
   */
  this.constructUrl = function(options, urlParams){
    var hostname = options.hostname;
    var endPoint = options.endPoint;
    var apiVersion = options.apiVersion;
    var action = options.action;
    var url = hostname + "/" + endPoint + "/api/" + apiVersion + "/" + action;

    urlParams = urlParams || {};

    /* in the case that it have param for the url we add it in the most simple way */
    if (urlParams !== {}){
      url += "?";
      url += this.encodeParamsToSend(urlParams);
    }
    return url;
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

  /************************************************
                    TYPE VALIDATIONS
  ************************************************/
  /**
   * Validates if the provided value if an string
   * @method isString
   * @param  {string}  value objecto to be evaluated
   * @return {Boolean}       True if the provided object is an string
   */
  this.isString = function(value){
    return typeof(value) === "string";
  };

  return this;
};