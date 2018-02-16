<?php
include("connect.php");
$data=json_decode(file_get_contents('php://input'),true);
print_r($data);
    $name = $data['name'];
    $code = $data['code'];
    $status = $data['status'];
    echo $InsertQuery = "insert into bundle(name,code,status) 
    values('$name','$code','$status')";

        $result=$databaseconnection->query($InsertQuery);
        
        $lastId = $databaseconnection->insert_id;

        for($i=0;$i<count($data['idquestionType']);$i++) {
            $id_question_type = $data['idquestionType'][$i]['id'];
        
        
             echo  $InsertQuerys = "insert into bundle_has_question_type(id_bundle,id_question_type) 
            values('$lastId','$id_question_type')";
        
                $result=$databaseconnection->query($InsertQuerys);
        
        
        }

		$array['status']=true;
        $array['message']="Data Inserted";
        
        echo json_encode($array);
        ?>