<?php
	header('Content-Type: application/json');

    $uploaddir = $_POST['dir'];
    if(move_uploaded_file($_FILES["file"]['tmp_name'], $uploaddir . $_POST['id'] . '.png'))
    {
        echo json_encode(1);
    }else{
    	echo json_encode(0);
    }

?>