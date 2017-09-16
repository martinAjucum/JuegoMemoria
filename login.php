<?php

 

if(isset($_GET["error"]) && $_GET["error"] != "login") {

		header("Location: login.php");

	}

 

 ?>

 

<!DOCTYPE html>

<html lang="es">

<head>

	<meta charset="UTF-8">

	<title>Login</title>

	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

	<!-- Latest compiled and minified CSS -->

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Optional theme -->

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

	<link rel="stylesheet" href="css/estilos.css">

 

</head>

<body>

 <header >
        <div class="container text-center">
            <h1>Login Kiche Memoria</h1>
        </div>
    </header>

	<div class="container">


		<?php

 

			if(isset($_GET["error"])) {

				echo "<div class='alert alert-danger'><p>Usuario y / o Contrasea erroneos. Intentelo de nuevo.</p></div>";

			}

 

		 ?>

		<form action="ingresar.php" method="post">
			<h3 class="form-signin-heading">Bienvenido!</h3>
			<div class="form-group">

				<input type="text" class="form-control" name="usuario" placeholder="Usuario" required>

			</div>

			<div class="form-group">

				<input type="password" class="form-control" name="password" placeholder="Password" required>

			</div>

			<button type="submit" name="enviar" class="btn btn-lg btn-primary btn-block">Entrar</button>
			<a class="btn btn-primary btn-block" href="index.html">Cancelar</a>
		</form>

	</div>

 

<!-- Latest compiled and minified JavaScript -->
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>

</html>

 

