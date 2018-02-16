<?php
include("connect.php");
$data = json_decode(file_get_contents('php://input'),true);

// Primary key for update
$id = $_GET['id'];


// Data object to set the parameter
    $college_name = $data['college_name'];
    $hod_name = $data['hod_name'];
    $professor_name = $data['professor_name'];
    $phoneno = $data['phoneno'];
    $email = $data['email'];
    $package_type = $data['package_type'];
    $id_support = $data['id_support'];
    $id_bundle = $data['id_bundle'];
    $status = $data['status'];
    $password = $data['password'];
    $site_id = $data['site_id'];
    $state = $data['state'];
    $purchase_no = $data['purchase_no'];
    $date = $data['date'];
// Query to execute
echo $query = "update user 
set college_name='$college_name',hod_name='$hod_name',professor_name='$professor_name',
phoneno='$phoneno',email='$email',package_type='$package_type',id_support='$id_support',
id_bundle='$id_bundle',password='$password',status='$status',site_id='$site_id',
state='$state',purchaseno='$purchase_no',date='$date'
where id='$id'";

$result = $databaseconnection->query($query);

echo $result;
?>