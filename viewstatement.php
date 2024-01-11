<?php
// Connect to the database
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("127.0.0.1", "root", "", "employeecollection");

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request is a POST request for data modification
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if "action" key is set in $_POST
    $action = isset($_POST["action"]) ? $_POST["action"] : "viewstatement";

    error_log("Received action: " . $action);

    if ($action == "viewstatement") {
        $viewUserId = isset($_POST["userId"]) ? intval($_POST["userId"]) : 0;

        if ($viewUserId > 0) {
            // Fetch data from the user_sub table for the selected User ID
            $sql = "SELECT * FROM user_sub WHERE s_user_id = $viewUserId";
            error_log("SQL Query: $sql"); // Log the SQL query
            $result = $conn->query($sql);

            // Check for SQL errors
            if (!$result) {
                error_log("SQL Error: " . $conn->error);
                echo json_encode(["status" => "error", "message" => "SQL error occurred"]);
            } else {
                // Convert the result to an associative array
                $data = [];
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }

                // Output data as JSON
                echo json_encode(["status" => "success", "data" => $data]);
            }
        } else {
            // Handle invalid or missing userId
            echo json_encode(["status" => "error", "message" => "Invalid or missing userId"]);
        }
    } else {
        // Handle invalid or missing action
        echo json_encode(["status" => "error", "message" => "Invalid or missing action"]);
    }
} else {
    // Fetch data from the user_main table
    $sql = "SELECT * FROM user_main";
    $result = $conn->query($sql);

    // Convert the result to an associative array
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Output data as JSON
    echo json_encode(["status" => "success", "data" => $data]);
}

// Close the database connection
$conn->close();
?>
