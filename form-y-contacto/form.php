<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : "";
    $apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : "";
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $edad = isset($_POST["edad"]) ? $_POST["edad"] : "";

    $destinatario = $email;
    $asunto = "Gracias por unirte a la comunidad pokepedia";

    
    $mensaje = "¡Hola $nombre $apellido!\n\n";
    $mensaje .= "Gracias por unirte a la comunidad Pokepedia. Proximamente te enviaremos noticias del mundo Pokemon por aquí.\n\n";
    $mensaje .= "Atentamente,\n";
    $mensaje .= "El equipo de Pokepedia";

    $headers = "From: martystar.com@gmail.com\r\n";
    
    mail($destinatario, $asunto, $mensaje, $headers);

}
?>