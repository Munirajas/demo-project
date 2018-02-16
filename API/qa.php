<?php
include('application/conn.php');
header('Content-type:application/json;charset=utf-8');

$event_id = $_GET['id'];




 $query = "Select * from event_has_question where event_id='$event_id'";

         
$result = $sql->query($query);  
$i=0;
	while($row = $result->fetch_assoc()) {
	   
	     $questionId = $row['id'];
 $qatask[$i]['question'] = $row['question'];
 $qatask[$i]['questionId'] = $questionId;

	       $querya = "Select a.*,b.* from question_has_answer as a, user as b
	                 where a.question_id='$questionId' and a.user_id=b.id";

         
			$resulta = $sql->query($querya);  
			$j=0;
			$answers = [];

				while($row = $resulta->fetch_assoc()) {
				   
				  
			       $answers[$j] = $row;


			        $j++;
				}
 $qatask[$i]['answers'] = $answers;

      

        $i++;
	}

echo json_encode($qatask);

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

?> 