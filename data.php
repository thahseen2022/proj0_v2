<?php
// Connect to the database
$conn = new mysqli("127.0.0.1", "root", "", "employeecollection");

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request is a POST request for data modification
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process data modification
    $action = $_POST["action"];

    if ($action == "addUser") {
        // Validate and sanitize input data
        $newUsername = mysqli_real_escape_string($conn, $_POST["newUsername"]);
        $newAmountRemaining = floatval($_POST["newAmountRemaining"]);
        $newTotalAmount = floatval($_POST["newTotalAmount"]);

        // Insert new user into the database
        $sql = "INSERT INTO user_main (Username, Remaining_Amount, Total_Amount) VALUES ('$newUsername', $newAmountRemaining, $newTotalAmount)";
        $result = $conn->query($sql);

        // Check if the insertion was successful
        if ($result) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error adding user"]);
        }
    } elseif ($action == "subtractAmount") {
        // Validate and sanitize input data
        $customMessage = "Error going in action part in php";
        error_log($customMessage);


        $userId = intval($_POST["userId"]);
        $amountToSubtract = floatval($_POST["amount"]);

        // Fetch existing remaining amount
        $sql = "SELECT Remaining_Amount FROM user_main WHERE User_ID = $userId";
        $result = $conn->query($sql);
        
        if ($result && $row = $result->fetch_assoc()) {
            $currentRemainingAmount = floatval($row["Remaining_Amount"]);
        
            // Calculate new remaining amount after subtraction
            $newRemainingAmount = $currentRemainingAmount - $amountToSubtract;
        
            if ($newRemainingAmount < 0) {
                // Amount to subtract exceeds remaining amount
                echo json_encode(["status" => "error", "message" => "Amount to subtract exceeds remaining amount"]);
            } else {
                // Update remaining amount in the database
                $sql = "UPDATE user_main SET Remaining_Amount = $newRemainingAmount WHERE User_ID = $userId";
                $result = $conn->query($sql);
        
                // Check if the update was successful
                if ($result) {
                    echo json_encode(["status" => "success"]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Error updating remaining amount"]);
                }
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Error fetching current remaining amount"]);
        }
        
    } else {
        // Handle other data modification actions if needed
    }
} else {
    // Fetch data from the database
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