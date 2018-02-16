<?php
include("connect.php");
//print_r($_GET);
$data = $_GET['id'];
// print_r($data);
$id=$data;
if($id=='undefined' || $id==null || $id==''){
    $query = "select u.id,u.college_name,u.phoneno,u.site_id,u.hod_name,u.date,u.status,u.professor_name,u.state,st.state_name,u.purchase_no,u.id_support,u.email,u.package_type,u.password,s.name as supportName 
    from user as u,support as s,state as st
    where u.id_support=s.id and st.id=u.state";
}
else{
$query="select u.id,ub.id_user,ub.id_bundle,u.college_name,u.hod_name,u.professor_name,u.purchase_no,u.status,u.id_support,u.email,u.package_type,u.password,s.name as supportName 
from user as u,support as s,user_has_bundle as ub,bundle as b
where u.id_support=s.id and ub.id_user=u.id and ub.id_bundle=b.id and ub.id_user='$id'";
}
$result=$databaseconnection->query($query);
//print_r($result);
if(mysqli_num_rows($result)>0){
$i=0;
$user=[];
while($row = mysqli_fetch_assoc($result))
{
$user['userInfo'][$i]=$row;
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
?>