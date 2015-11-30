/**
 * With this class you will be able to comunicate with boosterMedia servers.
 * @class swaggerAPI
 *
 */
var swaggerAPI = (function () {
    'use-strict';
    var utils = new swaggerUtils();
    /**
     * Performs a call to the server using the funciton _constructUrl to get the url where to call
     * @method _call
     * @private
     * @param  {[type]}          callOptions [description]
     * @return {[type]}                      [description]
     */
    var _call = function (callOptions) {
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
        options.url = utils.constructUrl(options, options.params);
        request.open(options.method, options.url, options.async);
        options.params = {};
      }else{
        /* We construct the url without params. */
        options.url = utils.constructUrl(options);
        request.open(options.method, options.url, options.async);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      }
      var encodedParams = utils.encodeParamsToSend(options.params);
      request.send(encodedParams);
    };

    /**
     * The enviroment that will be used. Possibl values: dev, stage, and production.
     * @attribute endPoint
     * @default dev
     * @required
    */

   /**
     * The version of the api that will be used.
     * @attribute apiVersion
     * @default 1
     * @required
    */

    /**
     * The hostname used to call to the server.
     * @attribute hostname
     * @required
     * @readOnly
    */

   /**
    * When the server is reached but the status code is not 200..
    * The request.status_code and the response content is received as a param.
    * Can be defined in the class or in the call.
    * @event callbackError
    * @param {string} response The response Content
    * @param {int} status_code The status_code from the server (HTTP status code: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
    */

   /**
    * When there are any comunication erro in the call to the BoosterMedia server.
    * @event callbackConnectionError
    * @param {int} status_code The status_code from the server (HTTP status code: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
    */

   /**
    * When the call works fine.
    * It receives an object with the content of the response and the request.status_code.
    * @event callback
    * @param {string} response The response Content
    * @param {int} status_code The status_code from the server (HTTP status code: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
    */

    function swaggerAPI(defaultUserOptions){
      var self = this;
      var defaultCallOptions = {
          "hostname": 'http://alpha.calendar42.com/api',
          "endpoint": ""
      };
      var getSpecOptions = this.defaultCallOptions = utils.deepExtend({}, defaultCallOptions, defaultUserOptions);

      this.registerSpec = function(resp /* ,status */){
        // currently we assume the answer will be always a valid JSON
        resp = JSON.parse(resp);
        var apis = resp.apis;
        this.restAPI = resp;
        // once we have the list of apis, we get all the information of the api in a parallel asynch calls.
        // This might be done right after setting the basic list of apis available
        getAPISSpec.call(this, _constructAPI.bind(this));
      };

      getSpecOptions.callback = this.registerSpec.bind(this);

      // setting the interface for the API to be able to reGET the API specs and redefine the object
      this.getSpec = getSpec.bind(this, getSpecOptions);
      // Setting up the specs of the API
      this.getSpec();
      // Only for debug porposes:
      this.setEnv = function(env){
        this.defaultCallOptions.endPoint = env;
      };
    }

    var getMappingPoints = function(){

    };
    /**
     * Updates user's score with the given ​score,overwriting the current value.
     * @method postScore
     * @param  {int}           userId The id of the user that is being requested
     * @param  {int}           score The new value of the score of the user
     */

     /**
     * Returns the score of certain user.
     * @method getScore
     * @param  {int}            userId The id of the user that is being requested
     * @param  {int}            timestamp The timestamp of the call
     */

    /**
     * Updates user's achievement progress with the given ​stepsComplete, overwriting the current value.
     * @method updateAchievement
     * @param  {int}            userId The id of the user that is being requested
     * @param  {int}            stepsComplete The completed steps by the user
     */

    /**
     * Returns the steps completed and the total of steps of the achievement.
     * @method getAchievement
     * @param  {int}            userId The id of the user that is being requested
     * @param  {int}            achievementId The id of the requested achievement
     */
    /**
    * Generator pattern
    * Construction of the all call methods
    *   The definition of the restAPIPoints wil be the next one:
    *     {
            "entity" : [string] Name of the entity, mainly to identify it,
            "endPoints" : [
              {
                "action" : "get",
                "method" : "get"
              },
              {
                "action" : "post",
                "method" : "post"
              }
            ]
          }

      Addind a representation of the model that is expetced, some functionalities to add to this pattern would be:
        Param validation
        Param format validation

    */
    var constructEndPoint = function (endPoint) {
        return function (callOptions) {
            // mergin the default call options with the
            // options comming from the call and depending
            // of the call that we are doing.
            // This could be done adding the endPoint in the deepExtend method,
            // but because some validations are required, I choose to do the mapping.
            var callDefaultOptions = {
                "method": endPoint.method.toUpperCase(),
                "action": endPoint.action,
                "requiredParams" : endPoint.requiredParams
            };
            var options = utils.deepExtend({}, this.options, callDefaultOptions, callOptions);

            console.log("Calling with options", options);

            _call(options);
        };
    };

    /**
     * Gets all the information about the available apis and overrides everything is on the current specs.
     * @method getAPISSpec
     */
    var getAPISSpec = function(callbackMethod){
      // painful but still required
      var self = this;
      // containing the list of restAPI endpoints that will be called
      var apis = this.restAPI.apis;
      // used as a counters. Y will be used to count the callbacksm and call the callbackMethod only when all calls are being answered
      var i, y = 0;
      // The auxiliar var used to iterate over the apis
      var api;
      // Auxiliar variable to create the path
      var path;
      // containing hte default Call opstions
      var getAPIInformationOptions = this.defaultCallOptions;
      // Used to create the options for the call
      var apiGetOptions = {};
      // Method called after every one of the apis are called
      var callbackSuccess = function(resp,status,path){
        var restAPIPoints = apis;
        // searching for the api endpoint where to add the rest of information
        var api = restAPIPoints.filter(function( obj, idx, list){
          if(obj.path === path){
            if(list[idx].apis && list[idx].apis.push){
              list[idx].apis.push(resp.apis[0]);
            }else{
              list[idx].apis = [resp.apis[0]];
            }
          }
          return obj.path === path;
        });
        // in the case that all calls are being answered
        if(y === apis.length){
          callbackMethod();
        }
      };
      var errorCB = function(){
        // @TODO; make a proper error handler
      };
      // some basic validation never hurts
      if(apis && apis.length !== undefined){
        for (i = apis.length - 1; i >= 0; i--) {
          api = apis[i];
          // bit more of basic validation
          path = api.path ? api.path.slice() : "";
          // we call all in a asynch way passing as a param to the callback method which api is being requested
          apiGetOptions = {
              "url": "/docs/api-docs"+path,
              "callback": function(esp,status){
                y += 1;
                esp = JSON.parse(esp);
                callbackSuccess.bind(self,esp,status,this.endpoint)();
              },
              "callbackError": errorCB,
              "endpoint": path
          };
          apiGetOptions = utils.deepExtend({}, getAPIInformationOptions, apiGetOptions);
          _call.bind(this,apiGetOptions)();
        }
      }
    };


    /**
     * Method encharget of getting the specs of the swagger API. Because this is a really swagger based project.
     * A non abstraction is REQUIRED.
     * @return {object} definition of the swaggerAPI.
     */
    var getSpec = function(options){
      var self = this;
      // var registerSpec =
      var errorCB = function(resp, request){
        // @TODO: make a proper error handler
      };
      // the structure of the specs end  point is the following: .../api/docs/api-docs/
      var callDefaultOptions = {
          "action": "GET",
          "url": "/docs/api-docs/",
          // "callback": registerSpec.bind(this),
          "callbackError": errorCB
      };
      var callOptions = utils.deepExtend({}, callDefaultOptions, options);
      _call(callOptions);
    };
    /**
     * Method encharged to take the APIEndpoints and build the protorype of the
     * Javascript API object.
     * It will be required to handle url params like: "/api/v2/services/{id}/public/"
     * The aprams that are paramType = path are the ones that
     */
    _constructAPI = function (APIEndpoints){
      // @TODO Build the whole format validation. If required...
      var self = this;
      var operation;
      var restAPIPoint;
      // used to generate the entityName
      var entityName = "";
      // Used to refer the prototype of the constructor, that will be modified and extended in this method.
      var __proto__ = this.constructor.prototype;
      var apis = this.restAPI.apis;
      for (var i = 0; i < apis.length; i++) {
        restAPIPoint = apis[i];
        entityName = _getEntityName.bind(this,restAPIPoint)();
        __proto__[entityName] = {};
      }
      // this.prototype
    };
    /**
     * Encharged to get the name of the endpoint based on the
     * This method should be possible to be rewritted
     */
    var _getEntityName = function(restAPiPoint){
      var splittedPath;
      // Used to reach for the string v2 and use the next elements as an entity name
      var apiVersionString = "v" + this.restAPI.apiVersion;
      // Will contain an array with only what will be used to make the entity name
      var entityElements;
      // counter for going through the path
      var i;
      // the entityName that will be returned
      var entityName;
      // will contain the individual element to add as a suffix for the entity name
      var element;
      splittedPath = restAPiPoint.path.split(/\/|-/);
      // From the list elements we get what goes from the version to the end of the path.
      // That will be used to generate the entityName
      entityElements = splittedPath.slice(splittedPath.indexOf(apiVersionString)+1,splittedPath.length);
      entityName = utils.arrayToCamelCase(entityElements);
      return entityName;
    };
    // for (var y = restAPIPoints.length - 1; y >= 0; y--) {
    //   var endPoints = restAPIPoints[y].endPoints;
    //   // var entity = restAPIPoints[y].entity;
    //   for (var i = endPoints.length - 1; i >= 0; i--) {
    //         var action = endPoints[i].action;
    //         // var method = endPoints[i].method;
    //         // We send the endPoint to the generateEndpoint
    //         swaggerAPI.prototype[action] = constructEndPoint(endPoints[i]);
    //     }
    // }
    /**
     * End generator pattern
     */
    return swaggerAPI;
})();
