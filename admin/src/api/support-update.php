<?php
include("connect.php");
$id = $_GET['id'];
$data1 = (json_decode($_POST['data']));
   
print_r($_POST);
print_r($data1);
print_r($_FILES);

$name = $data1->name;
$mobile = $data1->mobile;
$email = $data1->email;
$status = $data1->status;

$filename = $_FILES['file']['name'];
$target_dir = "../uploads/";
// $target_file = $target_dir . basename($_FILES["file"]["name"]);
// $uploadOk = 1;
echo $query = "update support set name='$name',
mobile='$mobile',
email='$email',photo='$filename' 
where id='$id'";

$result = $databaseconnection->query($query);


if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$filename)) {
    echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded.";

    $photo =$_FILES["file"]["name"];
// Query to execute

$array['status']=true;
$array['message']="Data Updated";
} else {
echo "Sorry, there was an error uploading your file.";
$array['status']=false;
 $array['message']="Not Updated";
}



echo json_encode($array);
?>