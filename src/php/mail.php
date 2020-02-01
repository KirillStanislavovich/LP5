<?php

  $method = $_SERVER['REQUEST_METHOD'];

  $c = true;
  if ( $method === 'POST' ) {
    $project_name = trim($_POST["project_name"]);
    $admin_email = trim($_POST["admin_email"]);
    $form_subject = trim($_POST["form_subject"]);

    foreach ( $_POST as $key => $value ) {
      if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
        $message .= "<strong>$key </strong>   $value <br>";
      }
    }
  } else if ( $method === 'GET' ) {
      $project_name = trim($_GET["project_name"]);
      $admin_email = trim($_GET["admin_email"]);
      $form_subject = trim($_GET["form_subject"]);

      foreach ( $_GET as $key => $value ) {
        if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
          $message .= "<strong>$key</strong> $value";
        }
      }
    }

  function adopt($text) {
    return '=?UTF-8?B?'.Base64_encode($text).'?=';
  }

  $headers = "MIME-Version: 1.0\r\n".
    "Content-type: text/html; charset=utf-8\r\n".
    "Return-path: kirill.iz.nur@gmail.com";

  mail($admin_email, adopt($form_subject), $message, $headers);

?>

