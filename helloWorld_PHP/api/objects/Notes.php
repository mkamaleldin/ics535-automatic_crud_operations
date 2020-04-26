<?php
    class Notes{

        // database connection and table name
        private $conn;
        private $table_name = "Notes";

        // object properties
        public $noteID;
public $title;
public $notes;


        // constructor with $db as database connection
        public function __construct($db){
            $this->conn = $db;
        }

        function read(){

          // select all query
          $query = "SELECT * FROM " . $this->table_name . ";";

          // prepare query statement
          $stmt = $this->conn->prepare($query);

          // execute query
          $stmt->execute();

          return $stmt;
      }

      function create(){

          // query to insert record
          $query = "INSERT INTO
                      " . $this->table_name . "
                  SET
                       noteID=:noteID,title=:title,notes=:notes";

          // prepare query
          $stmt = $this->conn->prepare($query);

          // sanitize
         $this->noteID=htmlspecialchars(strip_tags($this->noteID))
;$this->title=htmlspecialchars(strip_tags($this->title))
;$this->notes=htmlspecialchars(strip_tags($this->notes))
;

          // bind values
          $stmt->bindParam(":noteID", $this->noteID);
$stmt->bindParam(":title", $this->title);
$stmt->bindParam(":notes", $this->notes);

          
          // execute query
          if($stmt->execute()){
              return true;
          }

          return false;

      }
       function update(){
  
          // update query
          $query = "UPDATE
                      " . $this->table_name . "
                  SET
                      noteID=:noteID,title=:title,notes=:notes
                  WHERE
                      noteID = :noteID";

          // prepare query statement
          $stmt = $this->conn->prepare($query);

          // sanitize
          $this->noteID=htmlspecialchars(strip_tags($this->noteID))
;$this->title=htmlspecialchars(strip_tags($this->title))
;$this->notes=htmlspecialchars(strip_tags($this->notes))
;

          // bind new values
          $stmt->bindParam(":noteID", $this->noteID);
$stmt->bindParam(":title", $this->title);
$stmt->bindParam(":notes", $this->notes);


          // execute the query
          if($stmt->execute()){
              return true;
          }

          return false;
      }
      function delete(){
  
          // delete query
          $query = "DELETE FROM " . $this->table_name . " WHERE noteID = ?";

          // prepare query
          $stmt = $this->conn->prepare($query);

          // sanitize
          $this->noteID=htmlspecialchars(strip_tags($this->noteID));

          // bind id of record to delete
          $stmt->bindParam(1, $this->noteID);

          // execute query
          if($stmt->execute()){
              return true;
          }

          return false;
      }
    }
    ?>