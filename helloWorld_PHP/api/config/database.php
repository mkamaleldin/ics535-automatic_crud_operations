<?php
      class Database{

          // specify your own database credentials
          private $host = "localhost";
          private $db_name = "hello_world";
          private $username = "root";
          private $password = "zaq1!QAZ";
          public $conn;
          
          // get the database connection
          public function createDatabase(){

              $this->conn = new mysqli($host, $username, $password);

              if ($conn->connect_error) {
                  die("Connection failed: " . $conn->connect_error);
              } 
              // Creating a database named newDB
              $sql = "CREATE DATABASE hello_world IF NOT EXIST;.";
              if ($conn->query($sql) === TRUE) {
              } else {
                  echo "Error creating database: " . $conn->error;
              }
              
              $sql = "CREATE TABLE Users (
	userID			INT,
	name			VARCHAR,
PRIMARY KEY (userID)
);


CREATE TABLE Notes (
	noteID			INT,
	title			VARCHAR NOT NULL UNIQUE,
	notes			VARCHAR,
PRIMARY KEY (noteID)
);

";
              
              if ($conn->query($sql) === TRUE) {
                  echo "DB created";
              } else {
                  echo "Error creating database: " . $conn->error;
              }

              // closing connection
              $conn->close();
          }

          // get the database connection
          public function getConnection(){

              $this->conn = null;

              try{
                  $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
                  $this->conn->exec("set names utf8");
              }catch(PDOException $exception){
                  echo "Connection error: " . $exception->getMessage();
              }

              return $this->conn;
          }
      }
      ?>