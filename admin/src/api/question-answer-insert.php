<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
	// $id = $data['id'];
    $question = $data['question'];
    $id_question_type = $data['id_question_type'];
    $id_bundle = $data['id_bundle'];
    $status = $data['status'];

    $answer = $data['answer'];
    $InsertQuery = "insert into question(id_bundle,question,id_question_type,answer,status) 
    values('$id_bundle','$question','$id_question_type','$answer','$status')";

		$result=$databaseconnection->query($InsertQuery);
		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
?>