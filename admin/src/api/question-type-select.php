<?php
include("connect.php");

$query="select * from question_type";
$result=$databaseconnection->query($query);
$i=0;
$qtype=[];
while($row = mysqli_fetch_assoc($result))
{
    
$qtype['qtypeInfo'][$i]=$row;
$i++;
}
echo json_encode($qtype);
?>