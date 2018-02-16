<?php
@ob_start();
session_start();
$username = "root";
$password = "root";
$hostname = "localhost"; 
date_default_timezone_set('asia/kolkata');
$updated_date = date('Y-m-d H:i:s');
$sql = mysqli_connect("localhost",$username,$password,"hackathon");
error_reporting(0);
?>
