<?php
      // required headers
      header("Access-Control-Allow-Origin: *");
      header("Content-Type: application/json; charset=UTF-8");

      // include database and object files
      include_once '../config/database.php';
      include_once '../objects/Notes.php';

      // instantiate database and product object
      $database = new Database();
      $db = $database->getConnection();

      // initialize object
      $entity = new Notes($db);

      $stmt = $entity->read();
      $num = $stmt->rowCount();

      // check if more than 0 record found
      if($num>0){

          $entities_arr=array();

          while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
              extract($row);

              $item=array(
                  "noteID" => $noteID,
"title" => $title,
"notes" => $notes,

              );

              array_push($entities_arr, $item);
          }

          // set response code - 200 OK
          http_response_code(200);

          echo json_encode($entities_arr);
      } else {
          // set response code - 404 Not found
          http_response_code(404);

          // tell the user no products found
          echo json_encode(
              array("message" => "No data found.")
          );
      } 
      ?> 