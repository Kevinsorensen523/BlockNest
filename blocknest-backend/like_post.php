<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$response = array();

if(isset($_POST['post_id']) && isset($_POST['user_id']) && isset($_POST['type'])) {
    $post_id = (int)$_POST['post_id'];
    $user_id = (int)$_POST['user_id'];  // Ini adalah user yang melakukan aksi
    $type = $_POST['type'];

    require_once __DIR__ . '/dbconfig.php';
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die('Error connecting to MySQL server.');

    $ownerQuery = "SELECT user_id FROM post WHERE user_id = ?";
    $ownerStmt = $db->prepare($ownerQuery);
    $ownerStmt->bind_param('i', $post_id);
    $ownerStmt->execute();
    $ownerStmt->bind_result($target_user_id);
    $ownerStmt->fetch();
    $ownerStmt->close();

    switch ($type) {
        case "check":
            $query = "SELECT 1 FROM post_likes WHERE user_id = ? AND post_id = ? LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bind_param('ii', $user_id, $post_id);
            $stmt->execute();
            $stmt->store_result();
            $response["isLiked"] = ($stmt->num_rows > 0) ? 1 : 0;
            break;

        case "like":
            $checkQuery = "SELECT 1 FROM post_likes WHERE post_id = ? AND user_id = ?";
            $checkStmt = $db->prepare($checkQuery);
            $checkStmt->bind_param('ii', $post_id, $user_id);
            $checkStmt->execute();
            $checkStmt->store_result();

            if ($checkStmt->num_rows == 0) {
                $insertLikeQuery = "INSERT INTO post_likes(post_id, user_id) VALUES(?, ?)";
                $insertInteractionQuery = "INSERT INTO user_interactions(post_id, user_id, target_user_id, action_type) VALUES(?, ?, ?, 'like')";
                
                $insertLikeStmt = $db->prepare($insertLikeQuery);
                $insertInteractionStmt = $db->prepare($insertInteractionQuery);

                $insertLikeStmt->bind_param('ii', $post_id, $user_id);
                $insertInteractionStmt->bind_param('iii', $post_id, $user_id, $target_user_id);

                if ($insertLikeStmt->execute() && $insertInteractionStmt->execute()) {
                    $response["isLiked"] = 1;
                } else {
                    $response["success"] = 0;
                    $response["message"] = "Failed to add like.";
                }
            } else {
                $response["success"] = 0;
                $response["message"] = "User already liked this post.";
            }
            break;

        case "unlike":
            $deleteLikeQuery = "DELETE FROM post_likes WHERE user_id = ? AND post_id = ?";
            $deleteInteractionQuery = "DELETE FROM user_interactions WHERE user_id = ? AND post_id = ? AND action_type = 'like'";

            $deleteLikeStmt = $db->prepare($deleteLikeQuery);
            $deleteInteractionStmt = $db->prepare($deleteInteractionQuery);

            $deleteLikeStmt->bind_param('ii', $user_id, $post_id);
            $deleteInteractionStmt->bind_param('ii', $user_id, $post_id);

            if ($deleteLikeStmt->execute() && $deleteInteractionStmt->execute()) {
                $response["isLiked"] = 0;
            } else {
                $response["success"] = 0;
                $response["message"] = "Failed to remove like.";
            }
            break;

        default:
            $response["success"] = 0;
            $response["message"] = "Invalid action type specified.";
            break;
    }

    $response["success"] = 1;
    $response["message"] = "Operation completed successfully.";
} else {
    $response["success"] = 0;
    $response["message"] = "Incomplete data provided.";
}

echo json_encode($response);
?>
