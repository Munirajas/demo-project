<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);

    $name = $data['name'];
    $email = $data['email'];

    $dataResult = explode("T",$data['date']);

    $date = $dataResult[0];
    $from_time = $data['from_time'];
    $to_time = $data['to_time'];
    $id_user = $data['id_user'];
    $description = $data['description'];

   // $id_question_type = $data['id_question_type'];

    echo $InsertQuery = "insert into  event(event_name,from_time,to_time,id_user,description,date) 
    values('$name','$from_time','$to_time','$id_user','$description','$date')";

		$result=$databaseconnection->query($InsertQuery);

      



		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
        ?>