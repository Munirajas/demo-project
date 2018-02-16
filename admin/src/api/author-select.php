<?php
include("connect.php");

$query="select * from event";

$result=$databaseconnection->query($query);
if(mysqli_num_rows($result) > 0){
$i=0;
$author=[];
while($row=mysqli_fetch_assoc($result))
{

    $eventId = $row['id'];
	 $querya = "Select avg(question_four) as avg from event_has_review where event_id='$eventId'";

         
			$resulta = $databaseconnection->query($querya);  

			$avergae = 0;

				while($rows = $resulta->fetch_assoc()) {
				   
				  
			       $avergae = $rows['avg'];
			       

				}

             
			$row['avergae'] = number_format($avergae, 1);

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