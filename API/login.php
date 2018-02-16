<?php
include('application/conn.php');
header('Content-type:application/json;charset=utf-8');
$data = json_decode(file_get_contents('php://input'), true);





if($data) {
    $i=0;
	$email = $data['email'];
    $query = "Select * from user where email='$email' ";
	$result = $sql->query($query);  
	while($row = $result->fetch_assoc()) {
      // $result['userInfo'] = $row;
		$userInfo['userInfo']['status'] = true;
       $userInfo['userInfo']['userDetails'] = $row;
       $i=1;

	}

    if($i==0) {
    	$name = $data['name'];
    	$profile_pic = $data['imageUrl'];
    	$query = "Insert into user (name,email) values ('$name','$email') ";
    	$result = $sql->query($query);  

    	 $query = "Select * from user where email='$email' ";
			$result = $sql->query($query);  
			while($row = $result->fetch_assoc()) {
		      // $result['userInfo'] = $row;
				$userInfo['userInfo']['status'] = true;
		       $userInfo['userInfo']['userDetails'] = $row;
		       
			}

    }

	
	echo json_encode($userInfo);
}

?> 