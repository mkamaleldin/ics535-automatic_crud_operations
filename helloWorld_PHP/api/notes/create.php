<?php
      // required headers
      header("Access-Control-Allow-Origin: *");
      header("Content-Type: application/json; charset=UTF-8");
      header("Access-Control-Allow-Methods: POST");
      header("Access-Control-Max-Age: 3600");
      header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

      // get database connection
      include_once "../config/database.php";
      include_once "../objects/Notes.php";

      $database = new Database();
      $db = $database->getConnection();

      $entity = new Notes ($db);

      // get posted data
      $data = json_decode(file_get_contents("php://input"));
      
      $entity->noteID = $data->noteID;
$entity->title = $data->title;
$entity->notes = $data->notes;


          if($entity->create()){

              // set response code - 201 created
              http_response_code(201);

              echo json_encode(array("message" => "Successfully created."));
          }

          else{

              // set response code - 503 service unavailable
              http_response_code(503);

              echo json_encode(array("message" => "Error occured."));
          }
      ?>