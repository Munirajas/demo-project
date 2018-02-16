<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
$id_user = $data['iduser'];
$comment = $data['comment'];
$next_calling_date = $data['next_calling_date'];
  echo $InsertQuery = "insert into user_has_comments(id_user,comment,next_calling_date) 
    values('$id_user','$comment','$next_calling_date')";
    
        $result=$databaseconnection->query($InsertQuery);
        
		$array['status']=true;
        $array['message']="Data Inserted";
       
        echo json_encode($array);
        ?>