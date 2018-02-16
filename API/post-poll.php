<?php
include('application/conn.php');
//header('Content-type:application/json;charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true);


$event_id = $data['event_id'];
$user_id = $data['user_id'];
$question_one = $data['question_one'];
$question_two = $data['question_two'];
$question_three = $data['question_three'];
$question_four = $data['question_four'];

$query = "Insert into event_has_review
 (event_id,user_id,question_one,question_two,question_three,question_four) values 
 ('$event_id','$user_id','$question_one','$question_two','$question_three','$question_four')";


$result = $sql->query($query); 

$userInfo['success'] = true;
echo json_encode($userInfo);
?> 