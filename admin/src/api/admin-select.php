<?php
include("connect.php");
$query="select * from admin";
$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$admin=[];
while($row=mysqli_fetch_assoc($result))
{
    $admin['adminInfo'][$i]=$row;
    $i++;

}
$array['status']=true;
$array['message']="Valid User";
// alert("Valid User");
}
else{
    $array['status']=false;
    $array['message']="Invalid User";
    // alert("Invalid User");
}

echo json_encode($admin);

?> 