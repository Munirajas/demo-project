<?php
include("connect.php");
$data1 = (json_decode($_POST['data']));
   
print_r($_POST);
print_r($data1);
print_r($_FILES);

$name = $data1->name;
$mobile = $data1->mobile;
$email = $data1->email;
$status = $data1->status;
$designation = $data1->designation;
$about_presenter = $data1->about_presenter;
$filename = $_FILES['file']['name'];
$target_dir = "../uploads/";
// $target_file = $target_dir . basename($_FILES["file"]["name"]);
// $uploadOk = 1;

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir.$filename)) {
    echo "The file " . basename($_FILES["file"]["name"]) . " has been uploaded.";

   // $photo =$_FILES["file"]["name"];


    $array['status']=true;
    $array['message']="Data Inserted";
    // $query = "insert into image_upload(image) values()"
} else {
    echo "Sorry, there was an error uploading your file.";
    $array['status']=false;
     $array['message']="Not inserted";
}
 

 echo  $InsertQuery = "insert into user(name,email,mobile,status,profile_pic,designation,about_presenter) 
values('$name','$email','$mobile','$status','$photo','$designation','$about_presenter')";
$result = $databaseconnection->query($InsertQuery);

    echo json_encode($array);
?>