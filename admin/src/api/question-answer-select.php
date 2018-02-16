<?php
include("connect.php");
$query="select q.id,q.question,q.id_question_type,qt.type,q.answer,q.status 
from question as q,question_type as qt
where q.id_question_type=qt.id";
$result=$databaseconnection->query($query);
$i=0;
$question=[];
while($row = mysqli_fetch_assoc($result))
{
$question['quesInfo'][$i]=$row;
$i++;
}
echo json_encode($question);
?>