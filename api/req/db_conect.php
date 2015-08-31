<?php
	$dbhost = "localhost";
    $dbname = "logic";
    $dbuser = "root";
    $dbpass = "";

    //  Connection
    global $eduahApps_db;
    
    $eduahApps_db = new mysqli();
    @$eduahApps_db->connect($dbhost, $dbuser, $dbpass, $dbname);
    
    //  Check Connection
    if ($eduahApps_db->connect_errno) {
        printf("Connect failed: %s\n", $eduahApps_db->connect_error);
        exit();
    }
?>
