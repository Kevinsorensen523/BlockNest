<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['follower_id']) && isset($_POST['following_id']) && isset($_POST['type'])) {
    $follower_id = (int) $_POST['follower_id'];
    $following_id = (int) $_POST['following_id'];
    $type = $_POST['type'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    $isSucc = false;
    if($type == "check") {
        $query = "SELECT 1 FROM follow WHERE follower_user_id = ? AND following_user_id = ? LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ii', $follower_id, $following_id);
        $stmt->bind_result($ex);
        $stmt->execute();
        $stmt->fetch();
        if($ex) {
            $isSucc = true;
            $response["isFollowed"] = 1;
        } else {
            $isSucc = true;
            $response["isFollowed"] = 0;
        }
    }
    else if ($type == "follow") {
        $query = "INSERT INTO follow(follower_user_id, following_user_id) VALUES('$follower_id', '$following_id')";
        $stmt = $db->prepare($query);
        $stmt->execute();

        //If user A follows user B, then user B's follower count increments
        $query2 =  "UPDATE user SET followers = followers + 1 WHERE user_id = ?";
        $stmt2 = $db->prepare($query2);
        $stmt2->bind_param('s', $following_id);
        $stmt2->execute();

        //If user A follows user B, then user A's following count increments
        $query3 =  "UPDATE user SET following = following + 1 WHERE user_id = ?";
        $stmt3 = $db->prepare($query3);
        $stmt3->bind_param('s', $follower_id);
        $stmt3->execute();

        $response["isFollowed"] = 1;
        $isSucc = true;
    }
    else if($type == "unfollow") {
        $query = "DELETE FROM follow WHERE follower_user_id = ? AND following_user_id = ?";
        $stmt = $db->prepare($query);
        $stmt->bind_param('ii', $follower_id, $following_id);
        $stmt->execute();

        //If user A unfollows user B, then user B's follower count decrements
        $query2 =  "UPDATE user SET followers = followers - 1 WHERE user_id = ?";
        $stmt2 = $db->prepare($query2);
        $stmt2->bind_param('s', $following_id);
        $stmt2->execute();

        //If user A unfollows user B, then user A's following count decrements
        $query3 =  "UPDATE user SET following = following - 1 WHERE user_id = ?";
        $stmt3 = $db->prepare($query3);
        $stmt3->bind_param('s', $follower_id);
        $stmt3->execute();

        $response["isFollowed"] = 0;
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
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
    echo json_encode($response);
}
?>