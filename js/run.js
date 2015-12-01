window.onload = function(){
  document.getElementById("runner").addEventListener("click", run);
};
var API;
function run(){
  var swaggerOptions = {
    "serverInfo":{
      "basePath": 'http://beta.calendar42.com/api'
    },
    "operations":{

    }
  };
  API = new swaggerAPI(swaggerOptions);
}
run();
