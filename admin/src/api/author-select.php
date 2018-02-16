<?php
include("connect.php");

$query="select * from event";

$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$author=[];
while($row=mysqli_fetch_assoc($result))
{
    $author['authorInfo'][$i]=$row;
    $i++;

}
$author['status']=true;
$author['message']="Valid User";
// alert("Valid User");
}
else{
    $author['status']=false;
    $author['message']="Invalid User";
    // alert("Invalid User");
}

echo json_encode($author);

?> 