<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['content']) && isset($_FILES['photo']) && isset($_POST['user_id'])) {
    $user_id = (int) $_POST['user_id'];
    $content = $_POST['content'];
    $image = $_FILES['photo'];
    $date_posted = date("Y-m-d");
    //$foto = $_FILES['foto'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    //save uploaded image
    //$en_pass = password_hash($password, PASSWORD_BCRYPT);
    $source = $image['tmp_name'];
    $destination = 'uploads/post_img/' . $image['name'];
    move_uploaded_file($source, $destination);

    //mysql inserting a new row
    $result = mysqli_query($db, "INSERT INTO post(user_id, content, image, date_posted)
            VALUES('$user_id', '$content', '$destination', '$date_posted')");
    
    //check if row is inserted or not
    if ($result) {
        $response["success"] = 1;
        $response["message"] = "Data user berhasil dimasukkan";
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