<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
//if(isset($_POST['user_id'])) {
    //$user_id = (int) $_POST['user_id'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    $isSucc = false;
    $query =  "SELECT * FROM post ORDER BY (likes * 0.7 + comment_no * 0.3) DESC";
    $stmt = $db->prepare($query);
    //$stmt->bind_param('s', $user_id);
    $stmt->execute();
    $row_post = $stmt->get_result();
    //if($row_post) {
        $isSucc = true;
        $response["post"] = array();

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
            $stmt2->bind_param('s', $post["user_id"]);
            $stmt2->execute();
            $row_usr = $stmt2->get_result()->fetch_assoc();
            //$post["user"] = array();

            $user = array();
            $user["id"] = $row_usr["user_id"];
            $user["username"] = $row_usr["username"];
            $user["real_name"] = $row_usr["full_name"];
            $user["profile_pic"] = $row_usr["profile_pic"];
            $post["user"] = $user;
            //array_push($post["user"], $user);

            array_push($response["post"], $post);
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

?>