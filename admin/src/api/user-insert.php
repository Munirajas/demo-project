<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
	// $id = $data['id'];
    $college_name = $data['college_name'];
    $hod_name = $data['hod_name'];
    $professor_name = $data['professor_name'];
    $phoneno = $data['phoneno'];
    $email = $data['email'];
    $package_type = $data['package_type'];
    $id_support = $data['id_support'];
    if($id_support=='') {
        $id_support = 0;
    }
    //$id_bundle = $data['id_bundle'];
    $status = $data['status'];
    $password = $data['password'];
    $site_id = $data['site_id'];
    $state = $data['state'];
    $purchase_no = $data['purchase_no'];
    $date = $data['date'];
    echo $InsertQuery = "insert into user(college_name,hod_name,professor_name,
    phoneno,email,package_type,id_support,password,status,site_id,state,purchase_no,date) 
    values('$college_name','$hod_name','$professor_name','$phoneno','$email',
    '$package_type','$id_support','$password','$status','$site_id','$state','$purchase_no','$date')";

        $result=$databaseconnection->query($InsertQuery);
        
        $lastId = $databaseconnection->insert_id;

        for($i=0;$i<count($data['idbundle']);$i++) {
            $id_bundle = $data['idbundle'][$i]['id'];
        
        
             echo  $InsertQuerys = "insert into user_has_bundle(id_user,id_bundle) 
            values('$lastId','$id_bundle')";
        
                $result=$databaseconnection->query($InsertQuerys);
        
        
        }
		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
?>