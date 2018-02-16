<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
$id=$_GET['id'];
print_r($data);
    $type = $data['type'];
    $status = $data['status'];
       echo $query = "update question_type set type='$type',status='$status' where id='$id'";
		$result=$databaseconnection->query($query);
		$array['status']=true;
        $array['message']="Data Updated";
        
        echo json_encode($array);
        ?>