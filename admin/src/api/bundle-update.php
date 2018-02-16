<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
$id=$_GET['id'];
print_r($data);
$name = $data['name'];
$code = $data['code'];
$status = $data['status'];

    $query = "update bundle set name='$name',code='$code',status='$status' where id='$id'";
		$result=$databaseconnection->query($query);
		$array['status']=true;
        $array['message']="Data Updated";
        
        echo json_encode($array);
        ?>