<?php
// CORS headers for cross-origin requests
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

// JSON response array
$response = array();

// Check for required fields
if (isset($_POST['post_id'])) {
    $post_id = (int) $_POST['post_id'];

    // Include the database configuration file
    require_once __DIR__ . '/dbconfig.php';

    // Connect to the database
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    // Query to delete the post
    $stmt = $db->prepare("DELETE FROM post WHERE post_id = ?");
    $stmt->bind_param("i", $post_id);
    $stmt->execute();

    // Check if the post was deleted successfully
    if ($stmt->affected_rows > 0) {
        $response["success"] = 1;
        $response["message"] = "Post deleted successfully.";
    } else {
        $response["success"] = 0;
        $response["message"] = "Post not found or could not be deleted.";
    }

    $stmt->close();
    $db->close();
} else {
    $response["success"] = 0;
    $response["message"] = "Missing required parameter: post_id.";
}

echo json_encode($response);
