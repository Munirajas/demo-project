<?php
include("connect.php");
$query="select * from state";
$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$state=[];
while($row=mysqli_fetch_assoc($result))
{
    $state['stateInfo'][$i]=$row;
    $i++;

}
$state['status']=true;
$state['message']="Data Selected";
// alert("Valid User");
}
else{
    $state['status']=false;
    $state['message']="No data Found";
 
}

echo json_encode($state);

?> 