<?php
include("connect.php");
//print_r($_GET);
$id = $_GET['id'];
$query = "select * from user_has_comments where id_user='$id' order by id DESC LIMIT 5";
$result = $databaseconnection->query($query);
$i=0;
$user = [];
if(mysqli_num_rows($result)>0){
    
    while($row = mysqli_fetch_assoc($result))
{
$user['usercommentsInfo'][$i]=$row;
$i++;
}
$user['status']=true;
$user['message']='Data Found';
}
else{
    $user['status']=false;
    $user['message']='No Data Found';
}
echo json_encode($user);