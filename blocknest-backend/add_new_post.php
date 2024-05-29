<?php
if(isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
}

$response = array();

if(isset($_POST['content']) && isset($_FILES['photo']) && isset($_POST['user_id'])) {
    $user_id = (int)$_POST['user_id'];
    $content = $_POST['content'];
    $image = $_FILES['photo'];
    $date_posted = date("Y-m-d");

    require_once __DIR__ . '/dbconfig.php';

    $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

    $source = $image['tmp_name'];
    $destination = 'uploads/post_img/' . $image['name'];
    move_uploaded_file($source, $destination);

    $postStmt = $db->prepare("INSERT INTO post(user_id, content, image, date_posted) VALUES(?, ?, ?, ?)");
    $postStmt->bind_param('isss', $user_id, $content, $destination, $date_posted);
    $result = $postStmt->execute();
    $postStmt->close();

    if ($result) {
        $post_id = $db->insert_id;

        preg_match_all('/@(\w+)/', $content, $matches);
        $usernames = $matches[1];

        foreach ($usernames as $username) {
            $userQuery = $db->prepare("SELECT user_id FROM user WHERE username = ?");
            $userQuery->bind_param('s', $username);
            $userQuery->execute();
            $userQuery->store_result();
            $userQuery->bind_result($target_user_id);
            while ($userQuery->fetch()) {
                $interactionStmt = $db->prepare("INSERT INTO user_interactions(post_id, user_id, target_user_id, action_type, isOpen) VALUES (?, ?, ?, 'mention', 0)");
                $interactionStmt->bind_param('iii', $post_id, $user_id, $target_user_id);
                $interactionStmt->execute();
                $interactionStmt->close();
            }
            $userQuery->close();
        }

        $response["success"] = 1;
        $response["message"] = "Data user berhasil dimasukkan";
    } else {
        $response["success"] = 0;
        $response["message"] = "Terdapat kesalahan saat menambahkan post";
    }
    echo json_encode($response);
} else {
    $response["success"] = 0;
    $response["message"] = "Data tidak lengkap";
    echo json_encode($response);
}

mysqli_close($db);
?>
