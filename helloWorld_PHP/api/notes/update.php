<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // include database and object files
    include_once '../config/database.php';
    include_once '../objects/Notes.php';

    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $entity = new Notes($db);

    $data = json_decode(file_get_contents("php://input"));

    $entity->noteID = $data->noteID;
$entity->title = $data->title;
$entity->notes = $data->notes;


    if($entity->update()){

        // set response code - 200 ok
        http_response_code(200);

        echo json_encode(array("message" => "Updated successfully."));
    }

    // if unable to update, tell the user
    else{

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to update."));
    }
    ?>