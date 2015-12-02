window.onload = function(){
  document.getElementById("runner").addEventListener("click", run);
};
var API;
function run(){
  var swaggerOptions = {
    "serverInfo":{
      "basePath": 'http://demo.calendar42.com/api'
    },
    "operations":{
      "Calendar_Api_get_calendars":"getCalendars",
      "Event_Subscription_Api_post_event_subscription" : "postEventSubscription",
      "Event_Subscription_Api_get_event_subscriptions" : "getEventSubscription",
      "Event_Api_post_event" : "postEvent",
      "Event_Api_get_events" : "getEvents",
      "Location_Api_get_locations" : "getLocations",
      "Position_Api_post_position" : "postPosition",
      "Search_Event_Api_search_events" : "searchEvents",
      "Service_Api_get_service_by_id" : "getServiceById",
      "User_Attendance_Api_get_attendances" : "getAttendances"
    }
  };
  API = new swaggerAPI(swaggerOptions);
}
run();
