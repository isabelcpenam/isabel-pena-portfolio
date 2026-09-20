<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $access_key = filter_input(INPUT_POST, 'access_key', FILTER_SANITIZE_STRING);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Check if access key is valid
    if ($access_key !== '0ea6f02e-35e1-4bc8-801a-f700e7c5a95c') {
        http_response_code(403);
        echo json_encode(array("message" => "Invalid access key"));
        exit;
    }

    // Validate other form fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(array("message" => "All fields are required"));
        exit;
    }

    // Send email
    $to = "your_email@example.com"; // Change this to your email
    $headers = "From: $name <$email>" . "\r\n";
    $body = "Name: $name\nEmail: $email\n\n$message";
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(array("message" => "Email sent successfully"));
        exit;
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to send email"));
        exit;
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
    exit;
}
