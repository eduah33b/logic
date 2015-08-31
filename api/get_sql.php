<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';
	$return = '';
	
	$sql = $_POST['sql'];

	$result = $eduahApps_db->query($sql);
	while($results = @$result->fetch_array()) 
    {
    	foreach ($result as $row) {
				$return[] = $row;
		}
	}

	echo json_encode($return);
?>