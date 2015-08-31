<?php
	require 'req/db_conect.php';
	header('Content-Type: application/json');
	
	$sql = $_POST['sql'];
	if($eduahApps_db->query($sql)){
		echo($eduahApps_db->insert_id);
	}

?>