<?php
include('application/conn.php');
header('Content-type:application/json;charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true);

$event_id = $data['event_id'];
$question = $data['question'];
$user_id = $data['user_id'];

$query = "Insert into event_has_question (event_id,question,user_id) values ('$event_id','$question','$user_id')";

$result = $sql->query($query); 

$userInfo['success'] = true;
echo json_encode($userInfo);
?> 