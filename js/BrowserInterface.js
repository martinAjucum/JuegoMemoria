/**
 * Juego de memoria
 * Descripcion: carga de interfaz grafica
 */


(function($) {

    // click en el boton home
    var settings = document.getElementById('memory--settings-icon');
    var modal = document.getElementById('memory--settings-modal');
    var handleOpenSettings = function(event) {
        event.preventDefault();
        modal.classList.toggle('show');
    };
    settings.addEventListener('click', handleOpenSettings);

    // Manejo del formulario de configuracion
    var reset = document.getElementById('memory--settings-reset');
    var handleSettingsSubmission = function(event) {
        event.preventDefault();

        var selectWidget = document.getElementById("memory--settings-grid").valueOf();
        var grid = selectWidget.options[selectWidget.selectedIndex].value;
        var gridValues = grid.split('x');
        var cards = $.initialize(Number(gridValues[0]), Number(gridValues[1]));

        if (cards) {
            document.getElementById('memory--settings-modal').classList.remove('show');
            document.getElementById('memory--end-game-modal').classList.remove('show');
            document.getElementById('memory--end-game-message').innerText = "";
            document.getElementById('memory--end-game-score').innerText = "";
            buildLayout($.cards, $.settings.rows, $.settings.columns);
        }


        //Acediendo a la clase de cada card           

        // var contenedor = document.getElementById("memory--app-container");
        var cartas = document.getElementById("memory--cards");
        var lista = cartas.getElementsByTagName("li");
        // var primeraFigura = lista[0]; // 0 -> X
        for (var i = 0; i < lista.length; i++) {
            var figura = lista[i];
            var girar = figura.getElementsByTagName("div");
            var contenedor = girar[0];
            var enlaces = contenedor.getElementsByTagName("a");
            var nombre = enlaces[1].className;
            console.log("Clase: " + nombre);
        }

    };
    reset.addEventListener('click', handleSettingsSubmission);

    // Click sobre una carta
    var handleFlipCard = function(event) {

        event.preventDefault();

        var status = $.play(this.index);
        console.log(status);

        if (status.code != 0) {
            this.classList.toggle('clicked');
        }

        if (status.code == 3) {
            setTimeout(function() {
                var childNodes = document.getElementById('memory--cards').childNodes;
                childNodes[status.args[0]].classList.remove('clicked');
                childNodes[status.args[1]].classList.remove('clicked');
            }.bind(status), 500);
        } else if (status.code == 4) {
            var score = parseInt((($.attempts - $.mistakes) / $.attempts) * 100, 10);
            var message = getEndGameMessage(score);

            document.getElementById('memory--end-game-message').textContent = message;
            document.getElementById('memory--end-game-score').textContent =
                'Puntuación: ' + score + ' / 100';

            document.getElementById("memory--end-game-modal").classList.toggle('show');
        }

    };

    var getEndGameMessage = function(score) {
        var message = "";

        if (score == 100) {
            message = "Increible Trabajo!"
        } else if (score >= 70) {
            message = "Buen Trabajo!"
        } else if (score >= 50) {
            message = "Buen Trabajo!"
        } else {
            message = "Puedes hacerlo mejor.";
        }

        return message;
    }

    // Creando el grid para una carta
    var buildLayout = function(cards, rows, columns) {
        if (!cards.length) {
            return;
        }

        var memoryCards = document.getElementById("memory--cards");
        var index = 0;

        var cardMaxWidth = document.getElementById('memory--app-container').offsetWidth / columns;
        var cardHeightForMaxWidth = cardMaxWidth * (3 / 4);

        var cardMaxHeight = document.getElementById('memory--app-container').offsetHeight / rows;
        var cardWidthForMaxHeight = cardMaxHeight * (4 / 3);

        // Limpiar. Quitando todos los nodos hijo y tarjetas con el  event listeners.
        while (memoryCards.firstChild) {
            memoryCards.firstChild.removeEventListener('click', handleFlipCard);
            memoryCards.removeChild(memoryCards.firstChild);
        }

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                // Usar cloneNode(true) de lo contrario solo se agrega un nodo
                memoryCards.appendChild(buildCardNode(
                    index, cards[index].value, cards[index].isRevealed,
                    (100 / columns) + "%", (100 / rows) + "%"));
                index++;
            }
        }

        // Resimensionar las tarjetas para que quepan en el viewport
        if (cardMaxHeight > cardHeightForMaxWidth) {
            // Actualizando altura
            memoryCards.style.height = (cardHeightForMaxWidth * rows) + "px";
            memoryCards.style.width = document.getElementById('memory--app-container').offsetWidth + "px";
            memoryCards.style.top = ((cardMaxHeight * rows - (cardHeightForMaxWidth * rows)) / 2) + "px";
        } else {
            // Actualizando ancho
            memoryCards.style.width = (cardWidthForMaxHeight * columns) + "px";
            memoryCards.style.height = document.getElementById('memory--app-container').offsetHeight + "px";
            memoryCards.style.top = 0;
        }

    };

    // Actualizando tamaño
    window.addEventListener('resize', function() {
        buildLayout($.cards, $.settings.rows, $.settings.columns);
    }, true);

    // Construyendo una carta simple
    var buildCardNode = function(index, value, isRevealed, width, height) {
        var flipContainer = document.createElement("li");
        var flipper = document.createElement("div");
        var front = document.createElement("a");
        var back = document.createElement("a");

        flipContainer.index = index;
        flipContainer.style.width = width;
        flipContainer.style.height = height;
        flipContainer.classList.add("flip-container");
        if (isRevealed) {
            flipContainer.classList.add("clicked");
        }

        flipper.classList.add("flipper");
        front.classList.add("front");
        front.setAttribute("href", "#");
        back.classList.add("back");
        back.classList.add("card-" + value);
        /* console.log('card-' + value); */
        back.setAttribute("href", "#");

        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);

        flipContainer.addEventListener('click', handleFlipCard);

        return flipContainer;
    };

})(MemoryGame);