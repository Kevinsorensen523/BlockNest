<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['post_id']) && isset($_POST['user_id']) && isset($_POST['type'])) {
    $pid = (int) $_POST['post_id'];
    $uid = (int) $_POST['user_id'];
    $type = $_POST['type'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    $isSucc = false;

    if($type == "check") {
        $query = "SELECT 1 FROM post_likes WHERE user_id = ? AND post_id = ? LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ii', $uid, $pid);
        $stmt->bind_result($ex);
        $stmt->execute();
        $stmt->fetch();
        if($ex) {
            $isSucc = true;
            $response["isLiked"] = 1;
        } else {
            $isSucc = true;
            $response["isLiked"] = 0;
        }
    }
    else if ($type == "like") {
        $query = "INSERT INTO post_likes(post_id, user_id) VALUES('$pid', '$uid')";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $query2 =  "UPDATE post SET likes = likes + 1 WHERE post_id = ?";
        $stmt2 = $db->prepare($query2);
        $stmt2->bind_param('s', $pid);
        $stmt2->execute();

        $response["isLiked"] = 1;
        $isSucc = true;
    }
    else if($type == "unlike") {
        $query = "DELETE FROM post_likes WHERE user_id = ? AND post_id = ?";
        $stmt2 = $db->prepare($query);
        $stmt2->bind_param('ii', $uid, $pid);
        $stmt2->execute();

        $query2 =  "UPDATE post SET likes = likes - 1 WHERE post_id = ?";
        $stmt2 = $db->prepare($query2);
        $stmt2->bind_param('s', $pid);
        $stmt2->execute();

        $response["isLiked"] = 0;
        $isSucc = true;
    }
    
    
    //check if row is inserted or not
    if ($isSucc) {
        $response["success"] = 1;
        $response["message"] = "Data user berhasil didapatkan";
    } else {
        $response["success"] = 0;
        $response["message"] = "Terdapat kesalahan";
    }
    echo json_encode($response);
}
?>