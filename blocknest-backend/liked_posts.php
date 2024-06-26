<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

if (isset($_POST['user_id'])) {
    $user_id = (int)$_POST['user_id'];

    require_once __DIR__ . '/dbconfig.php';

    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    $query = "
        SELECT post.*, user.username, user.full_name, user.profile_pic
        FROM post
        JOIN post_likes ON post.post_id = post_likes.post_id
        JOIN user ON post.user_id = user.user_id
        WHERE post_likes.user_id = ?
        ORDER BY post.post_id DESC
    ";
    $stmt = $db->prepare($query);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $row_post = $stmt->get_result();

    $response["post"] = array();
    while ($row_post_ex = mysqli_fetch_array($row_post, MYSQLI_ASSOC)) {
        $post = array();
        $post["id"] = $row_post_ex["post_id"];
        $post["content"] = $row_post_ex["content"];
        $post["image"] = $row_post_ex["image"];
        $post["date_posted"] = $row_post_ex["date_posted"];
        $post["likes"] = $row_post_ex["likes"];
        $post["comments"] = $row_post_ex["comment_no"];

        $user = array();
        $user["id"] = $row_post_ex["user_id"];
        $user["username"] = $row_post_ex["username"];
        $user["real_name"] = $row_post_ex["full_name"];
        $user["profile_pic"] = $row_post_ex["profile_pic"];
        $post["user"] = $user;

        array_push($response["post"], $post);
    }

    $response["success"] = 1;
    $response["message"] = "Postingan yang disukai berhasil didapatkan";
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
}

echo json_encode($response);
?>
