<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['username']) && isset($_POST['full_name']) && isset($_POST['bio']) && isset($_FILES['foto'])) {
    $userId = (int)$_POST['user_id'];
    $username = $_POST['username'];
    $full_name = $_POST['full_name'];
    $bio = $_POST['bio'];
    $foto = $_FILES['foto'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    //save uploaded image
    //$en_pass = password_hash($password, PASSWORD_BCRYPT);
    $source = $foto['tmp_name'];
    $destination = 'uploads/profile_pics/' . $foto['name'];
    move_uploaded_file($source, $destination);

    //mysql inserting a new row
    /*$result = mysqli_query($db, "INSERT INTO user(email, username, password)
            VALUES('$email', '$username', '$en_pass')");*/

    $isSucc = false;
    $query =  "UPDATE user SET username = ?, full_name = ?, bio = ?, profile_pic = ? where user_id = ?";
    $array = array($username, $full_name, $bio, $destination, $userId);
    $stmt = $db->prepare($query);
    $stmt->bind_param("ssssi", $username, $full_name, $bio, $destination, $userId);
    $stmt->execute();
    
    //check if row is inserted or not
    $response["success"] = 1;
    $response["message"] = "Data user berhasil diedit";
    echo json_encode($response);
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
    echo json_encode($response);
}
?>