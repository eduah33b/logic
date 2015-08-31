<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';

	$email = $_POST['email'];
	$ps_word = $_POST['pword'];
	$return = '';
	
	$sql = 'SELECT * from users where email = "' .$email. '";';

	$result = $eduahApps_db->query($sql);
	while($results = @$result->fetch_array()) 
    {
    	foreach ($result as $row) {
			if(substr(md5($row['user_id'] . $row['date_added']), 0, 8) == $ps_word){
				$return = $row;
			}
		}
	}

	echo json_encode($return);
?>