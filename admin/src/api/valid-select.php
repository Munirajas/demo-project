<?php
include("connect.php");
$data = json_decode(file_get_contents("php://input"),true);
$email = $data['email'];
$password = md5($data['password']);
$query="select * from admin where email='$email' and password='$password'";
$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$admin=[];
while($row=mysqli_fetch_assoc($result))
{
    $admin['validInfo'][$i]=$row;
    $i++;

}
$admin['status']=true;
$admin['message']="Valid User";
// alert("Valid User");
}
else{
    $admin['status']=false;
    $admin['message']="Invalid User";
    // alert("Invalid User");
}

echo json_encode($admin);

?> 