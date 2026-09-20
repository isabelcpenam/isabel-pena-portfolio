<?php

// Check if the form is submitted via POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate email
    if (filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
        // You can process the subscription here, like adding the email to your database or sending it to an external service
        // For demonstration purpose, let's just return a success message
        echo json_encode(array("success" => true, "message" => "Subscription successful!"));
    } else {
        // Return an error message if the email is invalid
        echo json_encode(array("success" => false, "message" => "Invalid email address!"));
    }
} else {
    // Return an error message if the form is not submitted via POST method
    echo json_encode(array("success" => false, "message" => "Form submission method not allowed!"));
}

?>
