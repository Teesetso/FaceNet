<?php
$adminPhone = "27634879062"; // YOUR WhatsApp number (NO +)

$title = $_POST['title'];
$description = $_POST['description'];
$phone = $_POST['phone'];

$uploadedFiles = [];
$targetDir = "uploads/";
if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

foreach ($_FILES['images']['tmp_name'] as $key => $tmpName) {
    $imageName = time() . '_' . basename($_FILES['images']['name'][$key]);
    $targetFile = $targetDir . $imageName;
    if (move_uploaded_file($tmpName, $targetFile)) {
        $uploadedFiles[] = $targetFile;
    }
}

$message = "NEW AD SUBMISSION\n\n"
         . "Title: $title\n"
         . "Description: $description\n"
         . "Phone: $phone\n"
         . "Images:\n" . implode("\n", $uploadedFiles);

mail(
    "teesetsomaatlane33@gmail.com",
    "New Ad Submission - FaceNet",
    $message,
    "From: no-reply@facenet.com"
);

// WhatsApp text (URL encoded later)
$whatsappText = urlencode(
    "NEW AD SUBMISSION\n\n"
    . "Title: $title\n"
    . "Description: $description\n"
    . "Phone: $phone\n\n"
    . "Please verify before posting."
);

echo json_encode([
    "status" => "success",
    "message" => "Ad submitted successfully. Admin will review it.",
    "whatsapp" => "https://wa.me/$adminPhone?text=$whatsappText"
]);
?>
