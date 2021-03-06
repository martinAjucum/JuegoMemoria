<?php

 

	session_start();

	if($_SESSION["logueado"] == TRUE) {

		?>

 

		<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>Proyecto 1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="js/MemoryGame.js" type="text/javascript"></script>
    <script src="js/Card.js" type="text/javascript"></script>
    <link href="css/MemoryGame.css" type="text/css" rel="stylesheet" />
</head>

<body>
    <section id="memory--settings-modal" class="valign-table modal show">
        <div class="valign-cell">
            <form>
                <h2 class="memory--settings-label">Nivel de dificultad</h2>
                <select id="memory--settings-grid">
            <option value="2x3">Facil</option>
            <option value="3x4">Medio</option>
            <option value="4x5">Dificil</option>
            <option value="5x6">Experto</option>
          </select>
                <input id="memory--settings-reset" type="submit" value="Iniciar Nuevo Juego" />
              <a href="salir.php">  <input id="memory--settings-reset" type="button" value="Salir" /></a>

            </form>
        </div>
    </section>
    <section id="memory--end-game-modal" class="valign-table modal">
        <div class="valign-cell">
            <div class="wrapper">
                <h2 id="memory--end-game-message"></h2>
                <h3 id="memory--end-game-score"></h3>
            </div>
        </div>
    </section>
    <section id="memory--app-container">
        <ul id="memory--cards">
        </ul>
    </section>
    <section class="memory--menu-bar">
        <div class="inner">
            <div class="left">
                <h1 class="memory--app-name">K'iche' Memoria</h1>
            </div>
            <div class="right">
                <a href="#settings"><img id="memory--settings-icon" src="images/Inicio.png" /></a>
            </div>
        </div>
    </section>
<!-- Crag audio -->

    <script src="js/audio-fx.js"></script>
    <script>
        var music = AudioFX('sounds/music', {
            formats: ['mp3'],
            volume: 0.05,
            loop: true,
            autoplay: true
        });
        var pool = AudioFX('sounds/pool', {
            formats: ['mp3'],
            volume: 0.05,
            pool: 20
        });
        /* var single = AudioFX('sounds/single', {
             formats: ['ogg', 'mp3', 'm4a'],
             volume: 0.1
         });*/
    </script>
    <script src="js/BrowserInterface.js" type="text/javascript"></script>
</body>

</html>

		</html>

 

 

		<?php

	} else {

		header("Location: login.php");

	}

 

 ?>