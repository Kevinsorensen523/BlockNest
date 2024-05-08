<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

//array for JSON response
$response = array();

//check for required fields
if(isset($_POST['id'])) {
    $pid = (int) $_POST['id'];

    require_once __DIR__ . '/dbconfig.php';

    //connecting to db
    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or
    die(mysqli_connect_error());

    $isSucc = false;
    $query =  "SELECT * FROM comment WHERE post_id = ?";
    $stmt = $db->prepare($query);
    $stmt->bind_param('i', $pid);
    $stmt->execute();
    $row_comm = $stmt->get_result();
    //if($row_post) {
        $isSucc = true;
        $response["comment"] = array();

        while($row_comm_ex = mysqli_fetch_array($row_comm, MYSQLI_ASSOC)) {
            $comm = array();
            $comm["id"] = $row_comm_ex["id"];
            $comm["post_id"] = $row_comm_ex["post_id"];
            $comm["user_id"] = $row_comm_ex["user_id"];
            $comm["content"] = $row_comm_ex["content"];
            $comm["date_posted"] = $row_comm_ex["date_posted"];
            $comm["likes"] = $row_comm_ex["likes"];

            $query2 =  "SELECT * FROM user WHERE user_id = ?";
            $stmt2 = $db->prepare($query2);
            $stmt2->bind_param('s', $comm["user_id"]);
            $stmt2->execute();
            $row_usr = $stmt2->get_result()->fetch_assoc();
            //$post["user"] = array();

            $user = array();
            $user["username"] = $row_usr["username"];
            $user["real_name"] = $row_usr["full_name"];
            $user["profile_pic"] = $row_usr["profile_pic"];
            $comm["user"] = $user;
            //array_push($post["user"], $user);

            array_push($response["comment"], $comm);
            //$response["comment"] = $comm;
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