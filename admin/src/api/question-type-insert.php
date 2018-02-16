<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
    $type = $data['type'];
    $status = $data['status'];
    $InsertQuery = "insert into question_type(type,status) values('$type','$status')";

		$result=$databaseconnection->query($InsertQuery);
		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
?>