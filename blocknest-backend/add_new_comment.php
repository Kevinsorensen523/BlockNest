<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Array for JSON response
$response = array();

// Check for required fields
if(isset($_POST['content'], $_POST['post_id'], $_POST['user_id'])) {
    $user_id = (int) $_POST['user_id'];
    $post_id = (int) $_POST['post_id'];
    $content = $_POST['content'];
    $date_posted = date("Y-m-d");

    require_once __DIR__ . '/dbconfig.php';

    // Connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    // MySQL inserting a new row
    $insertCommentQuery = "INSERT INTO comment(post_id, user_id, content, date_posted) VALUES (?, ?, ?, ?)";
    $stmtComment = $db->prepare($insertCommentQuery);
    $stmtComment->bind_param('iiss', $post_id, $user_id, $content, $date_posted);
    if ($stmtComment->execute()) {  
        $insertInteractionQuery = "INSERT INTO user_interactions(post_id, user_id, action_type) VALUES (?, ?, 'comment')";
        $stmtInteraction = $db->prepare($insertInteractionQuery);
        $stmtInteraction->bind_param('ii', $post_id, $user_id);
        if ($stmtInteraction->execute()) {
            $response["success"] = 1;
            $response["message"] = "Data user berhasil dimasukkan";
        } else {
            $response["success"] = 0;
            $response["message"] = "Failed to insert user interaction";
        }
    } else {
        $response["success"] = 0;
        $response["message"] = "Failed to insert comment";
    }
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
}

echo json_encode($response);
?>
