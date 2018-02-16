<?php
include("connect.php");
//print_r($_GET);
$data = $_GET['id'];
$id=$data;
$query = "select * from user_has_pdf where id_user='$id' order by id desc";
$result=$databaseconnection->query($query);
$i=0;
$userbundle=[];
if(mysqli_num_rows($result)>0){
while($row = mysqli_fetch_assoc($result))
{
    $userbundle['userbundle'][$i]=$row;
    $i++;
}
    $userbundle['status']=true;
    $userbundle['message']='Data Found';
}
else{
    $userbundle['status']=false;
    $userbundle['message']='No Data Found';
}
echo json_encode($userbundle);