<?php

 

if(isset($_GET["error"]) && $_GET["error"] != "login") {

		header("Location: login.php");

	}

 

 ?>

 

<!DOCTYPE html>

<html lang="es">

<head>

	<meta charset="UTF-8">

	<title>Título de la página</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

	<!-- Latest compiled and minified CSS -->

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Optional theme -->

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

	<link rel="stylesheet" href="style.css">

 

</head>

<body>

 

	<div class=" container login">

		<h1>Login</h1>

		<?php

 

			if(isset($_GET["error"])) {

				echo "<p class='error'>Usuario y / o Contrasea erroneos. Intentelo de nuevo.</p>";

			}

 

		 ?>

		<form action="ingresar.php" method="post">

			<div class="form-group">

				<input type="text" class="form-control" name="usuario" placeholder="Usuario" required>

			</div>

			<div class="form-group">

				<input type="password" class="form-control" name="password" placeholder="Password" required>

			</div>

			<button type="submit" name="enviar" class="btn btn-primary">Entrar</button>

		</form>

	</div>

 

<!-- Latest compiled and minified JavaScript -->
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>

</html>

 

