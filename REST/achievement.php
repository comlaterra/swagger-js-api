<?php header("Access-Control-Allow-Origin: *"); 
require_once("utils.php");
/*
		THIS IS A REALLY SMALL BACKEND THAT PROCIDES OF ALL REQUIRED FUNCTIONALITIES FOR 
 */
if(isset($_REQUEST["action"])){
	if($_REQUEST["action"]=="get") $ret = getAchievement();
	if($_REQUEST["action"]=="update") $ret = updateAchievement();
}else{
	http_response_code(400);
	return returnError("Mission action", "BAD_REQUEST");
}

echo $ret;

function updateAchievement(){
	if(!isset($_REQUEST["userId"]) || !isset($_REQUEST["achievementId"]) || !isset($_REQUEST["stepsComplete"])){
		http_response_code(400);
		return returnError("Missing params", "BAD_REQUEST");
	}
	/* Optional, return some data, like the new Score for syncronization purposes */
	return returnOk("Updated");
}

function getAchievement(){
	if(!isset($_REQUEST["userId"]) || !isset($_REQUEST["achievementId"])){
		http_response_code(400);
		return returnError("Missing params", "BAD_REQUEST");
	}
	return returnData(true,array("stepsComplete"=>2, "stepsTotal"=>10));
}
?>