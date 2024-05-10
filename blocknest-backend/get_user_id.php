<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if (isset($_POST['username'])) {
    $username = $_POST['username'];

    require_once __DIR__ . '/dbconfig.php';

    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    $query = "SELECT user_id FROM user WHERE username = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    if ($result) {
        echo json_encode([
            "success" => 1,
            "user_id" => $result['user_id']
        ]);
    } else {
        echo json_encode([
            "success" => 0,
            "message" => "User not found"
        ]);
    }

    $stmt->close();
    $db->close();
} else {
    echo json_encode([
        "success" => 0,
        "message" => "Username parameter missing"
    ]);
}
?>