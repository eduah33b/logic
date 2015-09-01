<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';
	$return = '';


	$email = $_POST['email'];
	$phone_number = $_POST['phone_number'];
	$now = date("Y-m-d H:i:s");

	$sql = 'SELECT user_id from users where email = "' . $email . '" and phone_number = "' . $phone_number . '";;';
	$result = $eduahApps_db->query($sql);
	while($results = @$result->fetch_array()) 
    {
        $result_array[] = $results;
    }

    if(isset($result_array)) 
    {
    	$sql = 'UPDATE users SET date_added = "' . $now . '" where user_id = "' . $result_array[0]['user_id']  . '";';
    	if($eduahApps_db->query($sql)){
			$return = substr(md5($result_array[0]['user_id'] . $now), 0, 8);
		}		
    }	
	
	echo json_encode($return);
?>