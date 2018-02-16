<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
$id=$_GET['id'];
print_r($data);
    $name = $data['name'];
    $email = $data['email'];
    $password = md5($data['password']);
    $phone = $data['phone'];
    $id_question_type = $data['id_question_type'];
    $status = $data['status'];
    $query = "update author set name='$name',email='$email',password='$password',
    phone='$phone',id_question_type='$id_question_type',status='$status' where id='$id'";
		$result=$databaseconnection->query($query);
		$array['status']=true;
        $array['message']="Data Updated";
        
        echo json_encode($array);
        ?>