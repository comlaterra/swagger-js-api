<?php header("Access-Control-Allow-Origin: *"); 
require_once("utils.php");
/*
		THIS IS A REALLY SMALL BACKEND THAT PROCIDES OF ALL REQUIRED FUNCTIONALITIES FOR 
 */
if(isset($_REQUEST["action"])){
	if($_REQUEST["action"]=="get") $ret = getScore();
	if($_REQUEST["action"]=="post") $ret = postScore();
}else{
	http_response_code(400);
	return returnError("Missing params", "BAD_REQUEST");
}
echo $ret;

function postScore(){
	if(!isset($_REQUEST["userId"]) || !isset($_REQUEST["score"])){
		http_response_code(400);
		return returnError("Missing params", "BAD_REQUEST");
	}
	/* Optional, return some data, like the new Score for syncronization purposes */
	return returnOk("Posted");
}

function getScore(){
	if(!isset($_REQUEST["userId"])){
		http_response_code(400);
		return returnError("Missing params in get score", "BAD_REQUEST");
	}
	$date = new DateTime();
	return returnData(true,array("score"=>2, "timestamp"=>$date));
}

?>