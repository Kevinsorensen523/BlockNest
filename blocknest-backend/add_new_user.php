<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

// Array for JSON response
$response = array();

// Check for required fields
if(isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $bio = "Hello There! I am using Blocknest";
    $profile_pic = "uploads/profile_pics/default.svg";

    require_once __DIR__ . '/dbconfig.php';

    // Connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    // Encrypt password using hash
    $en_pass = password_hash($password, PASSWORD_BCRYPT);

    // Generate a random username
    $random_username = 'user' . uniqid();

    // MySQL inserting a new row
    $result = mysqli_query($db, "INSERT INTO user(email, username, password, full_name, bio, profile_pic)
            VALUES('$email', '$username', '$en_pass', '$random_username', '$bio', '$profile_pic')");
    
    // Check if row is inserted or not
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
