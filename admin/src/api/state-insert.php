<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
$state_name = $data['state_name'];
$date = date('Y-m-d H:i:s');
$createdBy = $data['createdBy'];
$status = $data['status'];
  echo $InsertQuery = "insert into state(state_name,createdBy,createddatetime,status) 
    values('$state_name','$createdBy','$date','$status')";
    
        $result=$databaseconnection->query($InsertQuery);
        
		$array['status']=true;
        $array['message']="Data Inserted";
       
        echo json_encode($array);
        ?>