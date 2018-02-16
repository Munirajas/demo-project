<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
$id=$_GET['id'];
print_r($data);
$name = $data['name'];
$email = $data['email'];
$password = md5($data['password']);
$status = $data['status'];
    $query = "update admin set name='$name',email='$email',password='$password',status='$status' where id='$id'";
		$result=$databaseconnection->query($query);
		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
        ?>