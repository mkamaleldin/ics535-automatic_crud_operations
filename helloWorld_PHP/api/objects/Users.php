<?php
class Users
{

    // database connection and table name
    private $conn;
    private $table_name = "Users";

    // object properties
    public $userID;
    public $name;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read()
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name . ";";

        // prepare query statement
        $stmt = $this
            ->conn
            ->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function create()
    {

        // query to insert record
        $query = "INSERT INTO
                      " . $this->table_name . "
                  SET
                       userID=:userID,name=:name";

        // prepare query
        $stmt = $this
            ->conn
            ->prepare($query);

        // sanitize
        $this->userID = htmlspecialchars(strip_tags($this->userID));
        $this->name = htmlspecialchars(strip_tags($this->name));

        // bind values
        $stmt->bindParam(":userID", $this->userID);
        $stmt->bindParam(":name", $this->name);

        // execute query
        if ($stmt->execute())
        {
            return true;
        }

        return false;

    }
    function update()
    {

        // update query
        $query = "UPDATE
                      " . $this->table_name . "
                  SET
                      userID=:userID,name=:name
                  WHERE
                      userID = :userID";

        // prepare query statement
        $stmt = $this
            ->conn
            ->prepare($query);

        // sanitize
        $this->userID = htmlspecialchars(strip_tags($this->userID));
        $this->name = htmlspecialchars(strip_tags($this->name));

        // bind new values
        $stmt->bindParam(":userID", $this->userID);
        $stmt->bindParam(":name", $this->name);

        // execute the query
        if ($stmt->execute())
        {
            return true;
        }

        return false;
    }
    function delete()
    {

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE userID = ?";

        // prepare query
        $stmt = $this
            ->conn
            ->prepare($query);

        // sanitize
        $this->userID = htmlspecialchars(strip_tags($this->userID));

        // bind id of record to delete
        $stmt->bindParam(1, $this->userID);

        // execute query
        if ($stmt->execute())
        {
            return true;
        }

        return false;
    }
}
?>
