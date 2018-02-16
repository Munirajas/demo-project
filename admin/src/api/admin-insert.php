<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
    $name = $data['name'];
    $email = $data['email'];
    $password = md5($data['password']);
    $status = $data['status'];
    // $bookInfo['bookInfo']=$books;

    $InsertQuery = "insert into admin(name,email,password,status) 
    values('$name','$email','$password','$status')";

		$result=$databaseconnection->query($InsertQuery);
		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
        ?>