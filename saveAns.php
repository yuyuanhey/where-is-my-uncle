<?php
	// header('Access-Control-Allow-Origin: https://yuyuanhey.github.io/where-is-my-uncle/index.html');
	// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	// header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
	// Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

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