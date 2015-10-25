<?php
/**
 * Returns the KO JSON
 * @method returnError
 * @param  [string]            $msg    The message that will be included in the response
 * @param  [string]            $codMsg The code of the response. It is not related with the status_code
 * @return [string]                    A string with the JSON that contains the response
 */
function returnError($msg,$codMsg=null){
	$returnData["msg"] = $msg;
	$returnData["success"] = false;
	if(isset($codMsg)) $returnData["codMsg"] = $codMsg;
	$ret = json_encode($returnData);
	return $ret;
}
/**
 * Returns the success JSON
 * @method returnOk
 * @param  [string]            $msg    The message that will be added in the response
 * @param  [string]            $codMsg The code of the result
 * @return [string]                    A string containing the JSON with the response
 */
function returnOk($msg=null,$codMsg=null){
	$returnData["success"] = true;
	if(isset($msg))$returnData["msg"] = $msg;
	if(isset($codMsg)) $returnData["codMsg"] = $codMsg;
	$ret = json_encode($returnData);
	return $ret;
}
/**
 * Returns a JSON with certin data on it
 * @method returnData
 * @param  [bool]            $success   If the operation is success or not
 * @param  [object]            $data      the data to include to the response
 * @param  [object]            $extraData If there are metadata or extradata, it should be returned in this field/
 * @return [string]                       String containing the JSON
 */
function returnData($success,$data=null,$extraData=null){
	if(isset($success))$returnData["success"] = $success;
	else return returnError("success no informat");
	if(isset($data)) $returnData["data"] = $data;
	else $returnData["data"]=array();
	if(isset($extraData))foreach ($extraData as $key => $value) $returnData[$key] = $value;

	$ret = json_encode($returnData);
	//$ret = $returnData;
	return $ret;
}
?>