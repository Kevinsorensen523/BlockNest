<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['content']) && (isset($_FILES['photo']) || isset($_POST['oldphoto'])) && isset($_POST['post_id'])) {
    $post_id = (int) $_POST['post_id'];
    $content = $_POST['content'];
    if(isset($_FILES['photo'])) {
        $image = $_FILES['photo'];
    } else {
        $image = $_POST['oldphoto'];
    }

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    //save uploaded image
    if(isset($_FILES['photo'])) {
        $source = $image['tmp_name'];
        $destination = 'uploads/post_img/' . $image['name'];
        move_uploaded_file($source, $destination);
    } else {
        $destination = $image;
    }

    //mysql inserting a new row
    $result = "UPDATE post SET content = ?, image = ? WHERE post_id = ?";
    $stmt = $db->prepare($result);
    $stmt->bind_param('ssi', $content, $destination, $post_id);
    
    //check if row is inserted or not
    if ($stmt->execute()) {
        $response["success"] = 1;
        $response["message"] = "Data post berhasil diedit";
    } else {
        $response["success"] = 0;
        $response["message"] = "Terdapat kesalahan";
    }
    echo json_encode($response);
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
    echo json_encode($response);
}
?>