window.onload = function(){
  function run(){
    var swaggerOptions = {
      "serverInfo":{
        "basePath": 'http://alpha.calendar42.com/api'
      },
      "operations":{

      }
    }
    var API = new swaggerAPI(swaggerOptions);
  }
  document.getElementById("runner").addEventListener("click", run);
}
