<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();
$response['post'] = [];

if (isset($_POST['currentTitle'])) {
    $searchTerm = $_POST['currentTitle'];
    error_log("Received term: " . $searchTerm);

    require_once __DIR__ . '/dbconfig.php';
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die("Connection failed: " . mysqli_connect_error());

    $query = "SELECT * FROM post WHERE content LIKE ? ORDER BY post_id DESC ,date_posted DESC, (likes * 0.7 + comment_no * 0.3) DESC";
    $stmt = $db->prepare($query);
    $likeTerm = '%' . $searchTerm . '%';
    $stmt->bind_param('s', $likeTerm);
    $stmt->execute();
    $row_post = $stmt->get_result();

    while($row_post_ex = mysqli_fetch_array($row_post, MYSQLI_ASSOC)) {
        $post = array();
        $post["id"] = $row_post_ex["post_id"];
        $post["user_id"] = $row_post_ex["user_id"];
        $post["content"] = $row_post_ex["content"];
        $post["image"] = $row_post_ex["image"];
        $post["date_posted"] = $row_post_ex["date_posted"];
        $post["likes"] = $row_post_ex["likes"];
        $post["comments"] = $row_post_ex["comment_no"];

        $query2 =  "SELECT * FROM user WHERE user_id = ?";
        $stmt2 = $db->prepare($query2);
        $stmt2->bind_param('i', $post["user_id"]); // Ensure the binding parameter matches the expected data type
        $stmt2->execute();
        $row_usr = $stmt2->get_result()->fetch_assoc();

        $user = array();
        $user["id"] = $row_usr["user_id"];
        $user["username"] = $row_usr["username"];
        $user["real_name"] = $row_usr["full_name"];
        $user["profile_pic"] = $row_usr["profile_pic"];
        $post["user"] = $user;

        array_push($response["post"], $post);
    }
    
    $response['success'] = 1;
    $response['message'] = "Posts containing search '{$searchTerm}' retrieved successfully.";
} else {
    $response['success'] = 0;
    $response['message'] = "No search '{$searchTerm}' term provided.";
}

echo json_encode($response);
?>