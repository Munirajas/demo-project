<?php
include("connect.php");
$data = $_GET['id'];

$id = $data;
if($id=='undefined' || $id==null || $id==''){ 
$query="select * from bundle";
}
else{
 $query="select bq.id_question_type,qt.type,bq.id_bundle,b.name
    from bundle_has_question_type as bq,bundle as b,question_type as qt
    where bq.id_question_type=qt.id and bq.id_bundle=b.id and b.id='$id'";
}
$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$bundle=[];
while($row=mysqli_fetch_assoc($result))
{
    $bundle['bundleInfo'][$i]=$row;
    $i++;

}
$bundle['status']=true;
$bundle['message']="Valid User";
// alert("Valid User");
}
else{
    $bundle['status']=false;
    $bundle['message']="Invalid User";
    // alert("Invalid User");
}

echo json_encode($bundle);

?> 