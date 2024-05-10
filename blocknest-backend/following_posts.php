<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

// Array untuk respons JSON
$response = array();

// Cek apakah `user_id` dikirim melalui permintaan POST
if (isset($_POST['user_id'])) {
    $user_id = (int)$_POST['user_id'];

    require_once __DIR__ . '/dbconfig.php';

    // Sambungkan ke database
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    // Kueri untuk mendapatkan postingan dari pengguna yang diikuti
    $query = "
        SELECT post.*, user.username, user.full_name, user.profile_pic
        FROM post
        JOIN follow ON post.user_id = follow.following_user_id
        JOIN user ON user.user_id = follow.following_user_id
        WHERE follow.follower_user_id = ?
        ORDER BY post.post_id DESC
    ";
    $stmt = $db->prepare($query);
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $row_post = $stmt->get_result();

    // Jika postingan ditemukan
    $response["post"] = array();
    while ($row_post_ex = mysqli_fetch_array($row_post, MYSQLI_ASSOC)) {
        $post = array();
        $post["id"] = $row_post_ex["post_id"];
        $post["content"] = $row_post_ex["content"];
        $post["image"] = $row_post_ex["image"];
        $post["date_posted"] = $row_post_ex["date_posted"];
        $post["likes"] = $row_post_ex["likes"];
        $post["comments"] = $row_post_ex["comment_no"];

        // Tambahkan detail pengguna ke dalam array postingan
        $user = array();
        $user["id"] = $row_post_ex["user_id"];
        $user["username"] = $row_post_ex["username"];
        $user["real_name"] = $row_post_ex["full_name"];
        $user["profile_pic"] = $row_post_ex["profile_pic"];
        $post["user"] = $user;

        array_push($response["post"], $post);
    }

    $response["success"] = 1;
    $response["message"] = "Postingan pengguna yang diikuti berhasil didapatkan";
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
}

// Kirim respons dalam format JSON
echo json_encode($response);
?>