<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';
	$return = '';

	$fname = $_POST['fname'];
	$lname = $_POST['lname'];
	$phone_number = $_POST['phone_number'];
	$email = $_POST['email'];
	$address = $_POST['address'];
	$city = $_POST['city'];
	$now = date("Y-m-d H:i:s");

	$sql = 'INSERT INTO users (fname, lname, phone_number, email, address, city, date_added) VALUES ("' . $fname . '", "' . $lname . '", "' . $phone_number . '", "' . $email . '", "' . $address . '","' . $city . '", "' . $now . '");';
	if($eduahApps_db->query($sql)){
		$return['pp'] = substr(md5($eduahApps_db->insert_id . $now), 0, 8);
		$return['user_id'] = $eduahApps_db->insert_id;
	}
	
	echo json_encode($return);
?>