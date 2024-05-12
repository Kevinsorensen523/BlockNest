<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

if(isset($_POST['post_id']) && isset($_POST['user_id']) && isset($_POST['type'])) {
    $post_id = (int)$_POST['post_id'];
    $user_id = (int)$_POST['user_id'];
    $type = $_POST['type'];

    require_once __DIR__ . '/dbconfig.php';
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    if($type == "check") {
        $query = "SELECT 1 FROM post_likes WHERE user_id = ? AND post_id = ? LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ii', $user_id, $post_id);
        $stmt->execute();
        $stmt->store_result();
        $response["isLiked"] = ($stmt->num_rows > 0) ? 1 : 0;
    } 
    else if ($type == "like") {
        $checkQuery = "SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ?";
        $checkStmt = $db->prepare($checkQuery);
        $checkStmt->bind_param('ii', $post_id, $user_id);
        $checkStmt->execute();
        $checkStmt->store_result();
        
        if($checkStmt->num_rows == 0) {
            $query = "INSERT INTO post_likes(post_id, user_id) VALUES(?, ?)";
            $stmt = $db->prepare($query);
            $stmt->bind_param('ii', $post_id, $user_id);
            if ($stmt->execute()) {
                $query2 = "UPDATE post SET likes = likes + 1 WHERE post_id = ?";
                $stmt2 = $db->prepare($query2);
                $stmt2->bind_param('i', $post_id);
                $stmt2->execute();
                $response["isLiked"] = 1;
            }
        }
    } 
    else if($type == "unlike") {
        $query = "DELETE FROM post_likes WHERE user_id = ? AND post_id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ii', $user_id, $post_id);
        if ($stmt->execute()) {
            $query2 = "UPDATE post SET likes = likes - 1 WHERE post_id = ?";
            $stmt2 = $db->prepare($query2);
            $stmt2->bind_param('i', $post_id);
            $stmt2->execute();
            $response["isLiked"] = 0;
        }
    }

    $response["success"] = 1;
    $response["message"] = "Data user berhasil didapatkan";
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
}

echo json_encode($response);
?>
