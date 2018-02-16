<?php
include('application/conn.php');
header('Content-type:application/json;charset=utf-8');
/*$data = json_decode(file_get_contents('php://input'), true);


if($data) {
	$userInfo['userInfo']['status'] = false;
	if(empty($data['username'].trim())) {
		$userInfo['userInfo']['userDetails'] = 'Please enter valid Username';
	}
	if(empty($data['password'].trim())) {
		$userInfo['userInfo']['userDetails'] = 'Please enter valid Password';
	}

	$username = $data['username'];
	$password = $data['password'];

	$query = "Select * from user where username='$username' and password='$password' and status='Active'";
	$result = $sql->query($query);  
	while($row = $result->fetch_assoc()) {
      // $result['userInfo'] = $row;
		$userInfo['userInfo']['status'] = true;
       $userInfo['userInfo']['userDetails'] = $row;

	}
	if(empty($userInfo['userInfo']['userDetails'])) {
       $userInfo['userInfo']['userDetails'] = 'Data not found';
	}

	echo json_encode($userInfo);
}*/
$userInfo['userInfo']['userDetails'] = 'Data not found';
echo json_encode($userInfo);
?> 