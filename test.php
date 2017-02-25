<?php
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