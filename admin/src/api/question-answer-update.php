<?php
include("connect.php");
$date = date('Y-m-d H:i:s');
$data = json_decode(file_get_contents('php://input'),true);

// Primary key for update
$id = $_GET['id'];


// Data object to set the parameter
$question1 = $data['question'];
$id_question_type1 = $data['id_question_type'];
$answer1 = $data['answer'];
$id_bundle1 = $data['id_bundle'];
$status1 = $data['status'];
$updatedBy1 = $data['updatedBy'];
// Query to execute

echo $query1 = "update question 
set question='$question1',id_question_type='$id_question_type1',id_bundle='$id_bundle1',answer='$answer1',status='$status1',updatedBy='$updatedBy',
updatedatetime='$date'
where id='$id'";
$result1 = $databaseconnection->query($query1);
?>