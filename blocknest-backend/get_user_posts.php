<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['user_id'])) {
    $user_id = (int) $_POST['user_id'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    $isSucc1 = false;
    $query1 =  "SELECT * FROM user where user_id = ?";
    $stmt1 = $db->prepare($query1);
    $stmt1->bind_param('s', $user_id);
    $stmt1->execute();
    $row_usr = $stmt1->get_result()->fetch_assoc();
    if($row_usr) {
            $isSucc1 = true;
            $response["user_mini"] = array();

            $user = array();
            $user["id"] = $row_usr["user_id"];
            $user["username"] = $row_usr["username"];
            $user["real_name"] = $row_usr["full_name"];
            $user["profile_pic"] = $row_usr["profile_pic"];
            $user["bio"] = $row_usr["bio"];
            $user["followers"] = $row_usr["followers"];
            $user["following"] = $row_usr["following"];
            array_push($response["user_mini"], $user);
    }

    $isSucc2 = false;
    $query2 =  "SELECT * FROM post where user_id = ? ORDER BY post_id DESC";
    $stmt2 = $db->prepare($query2);
    $stmt2->bind_param('s', $user_id);
    $stmt2->execute();
    $row_post = $stmt2->get_result();
    //if($row_post) {
        $isSucc2 = true;
        $response["post"] = array();

        while($row_post_ex = mysqli_fetch_array($row_post, MYSQLI_ASSOC)) {
            $post = array();
            $post["id"] = $row_post_ex["post_id"];
            $post["content"] = $row_post_ex["content"];
            $post["image"] = $row_post_ex["image"];
            $post["date_posted"] = $row_post_ex["date_posted"];
            $post["likes"] = $row_post_ex["likes"];
            $post["comments"] = $row_post_ex["comment_no"];
            array_push($response["post"], $post);
        }
    
    
    //check if row is inserted or not
    if ($isSucc1 && $isSucc2) {
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