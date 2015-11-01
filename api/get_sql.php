<?php
	header('Content-Type: application/json');
	require 'req/db_conect.php';
	$return = '';
	
	$sql = $_POST['sql'];	
	
	if ($eduahApps_db->multi_query($sql)){
		do {
		    if ($result = $eduahApps_db->store_result()) {
		        while ($results = @$result->fetch_array()) {
		        	foreach ($result as $row) {
						$return[] = $row;
					}
	            }
		        $result->free();
		    }
		} while ($eduahApps_db->more_results() && $eduahApps_db->next_result());
	}

	echo json_encode($return);
?>