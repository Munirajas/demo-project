<?php
include("connect.php");
$query="select * from user";
$result=$databaseconnection->query($query);
$i=0;
$support=[];
while($row = mysqli_fetch_assoc($result))
{
$support['supportInfo'][$i]=$row;
$i++;
}
echo json_encode($support);
?>