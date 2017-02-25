<?php
	header('Access-Control-Allow-Origin: *');
	// header('Access-Control-Allow-Origin: http://test.com');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
	// receive the ans that whether it will rain
	$ans  = $_POST["ifrain"];
	// $json is now a string
	$json = file_get_contents('ans.json');
	$data = json_decode($json, true);

	//change the ans in ans.json to the post data
	$data[0]['rain'] = $ans;

	$newjson = json_encode($data);
	// write to file
	file_put_contents('ans.json', $newjson);
?>