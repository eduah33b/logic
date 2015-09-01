<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';
	$return = '';
	$return['err'] = 0;

	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$phone_number = $_POST['phone_number'];
	$email = $_POST['email'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$now = date("Y-m-d H:i:s");

	/* get all users with same email and phone number */

	$sql = 'SELECT user_id, date_added from users where email = "' . $email . '" and phone_number = "' . $phone_number . '";';
	$result = $eduahApps_db->query($sql);
	while($results = @$result->fetch_array()) 
    {
        $result_array[] = $results;
    }

    if(isset($result_array)) 
    {
    	$return['err'] = 1;
    	die(json_encode($return));
    }else{
    	$sql = 'INSERT INTO users (fname, lname, phone_number, email, address, city, date_added) VALUES ("' . $fname . '", "' . $lname . '", "' . $phone_number . '", "' . $email . '", "' . $address . '","' . $city . '", "' . $now . '");';
		if($eduahApps_db->query($sql)){
			$return['pp'] = substr(md5($eduahApps_db->insert_id . $now), 0, 8);
			$return['user_id'] = $eduahApps_db->insert_id;
		}
		die(json_encode($return));
    }
?>