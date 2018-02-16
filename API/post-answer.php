<?php
include('application/conn.php');
header('Content-type:application/json;charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true);

$question_id = $data['question_id'];
$user_id = $data['user_id'];
$answer = $data['answer'];

$query = "Insert into question_has_answer (answer,question_id,user_id) values ('$answer','$question_id','$user_id')";


$result = $sql->query($query); 

$userInfo['success'] = true;
echo json_encode($userInfo);
?> 