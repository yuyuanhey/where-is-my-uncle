<?php

function openSerial($command) {
    $openSerialOK = false;
    try {
        exec("mode com4: BAUD=9600 PARITY=n DATA=8 STOP=1 to=off dtr=off rts=off");
        $fp =fopen("com7", "w");
        //$fp = fopen('/dev/ttyUSB0','r+'); //use this for Linux
        $openSerialOK = true;
    } catch(Exception $e) {
        echo 'Message: ' .$e->getMessage();
    }
    if($openSerialOK) {
        fwrite($fp, $command); //write string to serial
        fclose($fp);
    }   
}
 
openSerial("Without this line, the first control will not work. I don't know way.");
// if(isset($_POST['submit1'])) {
//     openSerial("H");
// }

// if(isset($_POST['submit2'])) {
//     openSerial("L");
// }
$str = "";
$rain;
$status;
$prob;
$temp;
if(isset($_POST['rain'])){
    $rain = $_POST['rain'];
    $str += $rain;
}
if(isset($_POST['status'])){
    $status = $_POST['status'];
    $str += (" " + $status);
}
if(isset($_POST['precipProbability'])){
    $prob = $_POST['precipProbability'];
    $str += (" " + $prob);
}
if(isset($_POST['temperature'])){
    $temp = $_POST['temperature'];
    $str += (" " + $temp);
}

?>