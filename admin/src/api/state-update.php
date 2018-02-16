<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
$id=$_GET['id'];
print_r($data);
$state_name = $data['state_name'];
$date = date('Y-m-d H:i:s');
$updatedBy = $data['updatedBy'];
$status = $data['status'];
    echo $query = "update state set state_name='$state_name',updatedBy='$updatedBy',status='$status',updatedatetime='$date' where id='$id'";
		$result=$databaseconnection->query($query);
		$array['status']=true;
        $array['message']="Data Updated";
        
        echo json_encode($array);
        ?>