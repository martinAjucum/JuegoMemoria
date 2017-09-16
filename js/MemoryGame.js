/**
 * Descripcion: Este es un juego de memoria escrito en JavaScript puro
 * El objetivo es emparejar pared de cartas en el menor número de pasos
 * de enparejamiento.

 */

/**
 * @namespace The main application object
 */
var MemoryGame = {

    settings: {
        rows: 2,
        columns: 3
    },

    // Propiedades que inican estados
    cards: [], // Arreglo de MemoryGame.Card objetos
    attempts: 0, // Cuantos pares de cartas fueron giradas anted de completar el juego.
    mistakes: 0, // Cuantos pares de cartas fueron giradas anted de completar el juego.
    isGameOver: false,

    /**
     * Modifique la configuración predeterminada para iniciar un nuevo juego.
     * Ambos parámetros necesitan números enteros mayores que uno, y al menos
     * uno de ellos necesita ser un número par
     *
     * @param {number} columns
     * @param {number} rows
     * @return {array} cartas aleatoreo 
     */
    initialize: function(rows, columns) {
        var validOptions = true;

        // Validación de elementos
        if (!(typeof columns === 'number' && (columns % 1) === 0 && columns > 1) ||
            !(typeof rows === 'number' && (rows % 1) === 0) && rows > 1) {
            validOptions = false;
            throw {
                name: "invalidInteger",
                message: "Both rows and columns need to be integers greater than 1."
            };
        }

        if ((columns * rows) % 2 !== 0) {
            validOptions = false;
            throw {
                name: "oddNumber",
                message: "Either rows or columns needs to be an even number."
            };
        }

        if (validOptions) {
            this.settings.rows = rows;
            this.settings.columns = columns;
            this.attempts = 0;
            this.mistakes = 0;
            this.isGameOver = false;
            this.createCards().shuffleCards();
            //new
            // this.createCards().addAudio();
        }

        return this.cards;
    },

    /**
     * Crea una matriz de cartas ordenadas
     * @return Reference to self object
     */
    createCards: function() {
        var cards = [];
        var count = 0;
        var maxValue = (this.settings.columns * this.settings.rows) / 2;
        while (count < maxValue) {
            cards[2 * count] = new this.Card(count + 1);
            cards[2 * count + 1] = new this.Card(count + 1);
            count++;
        }

        this.cards = cards;

        return this;
    },

    /**
     * Reorganizar elementos en el array de tarjetas
     * @return Reference to self object
     */
    shuffleCards: function() {
        var cards = this.cards;
        var shuffledCards = [];
        var randomIndex = 0;

        // Barajar cartas
        while (shuffledCards.length < cards.length) {

            // Valor aleatorio entre 0 y cards.length - 1
            randomIndex = Math.floor(Math.random() * cards.length);

            // Si el elemento no es falso, añadir elemento a la baraja arrastrada 
            if (cards[randomIndex]) {

                // Add new element to shuffle deck
                // Añadir nuevo elemento  a la baraja
                shuffledCards.push(cards[randomIndex]);

                // Set element to false to avoid being reused
                // Evitar usar elemento ya barajeado
                cards[randomIndex] = false;
            }

        }

        this.cards = shuffledCards;

        return this;
    },
    /**
     * Añadir audio 
     * @return Reference to self object
     */
    /* addAudio: function() {

         // return function(index) {
         var status = {};
         var value = this.cards[0].value;
         console.log("Card Number2: " + value);



         //  status.code = 0,
         //     status.message = 'Carta mirando hacia arriba.';


         // return status;

         //  };

         this.cards = addAudio;

         return this;
     },*/
    /**
     * Un jugador puede jugar dos cartas. Esta función devuelve información
     * sobre lo que pasa cuando se selecciona una tarjeta.
     *
     * @param {number} Index de carta seleccionado por el jugador
     * @return {object} {code: number, message: string, args: array or number}
     */
    play: (function() {
        var cardSelection = [];
        var revealedCards = 0;
        var revealedValues = [];

        return function(index) {
            var status = {};
            var value = this.cards[index].value;
            var audio = "card-" + value;
            console.log(audio)
                //Inlcusion del audio
            var single = AudioFX('sounds/' + audio, { formats: ['mp3'], volume: 0.2 });
            single.play();

            if (!this.cards[index].isRevealed) {
                this.cards[index].reveal();
                cardSelection.push(index);
                if (cardSelection.length == 2) {
                    this.attempts++;
                    if (this.cards[cardSelection[0]].value !=
                        this.cards[cardSelection[1]].value) {
                        // No emparejado
                        this.cards[cardSelection[0]].conceal();
                        this.cards[cardSelection[1]].conceal();
                        /**
                         * Algoritmo para determinar un error (Mistake).
                         * Revisa si el par de cartas ha sido revelado antes
                         *
                         * indexOf retorna -1 si el valor no es encontrado
                         */
                        var isMistake = false;

                        if (revealedValues.indexOf(this.cards[cardSelection[0]].value) === -1) {
                            revealedValues.push(this.cards[cardSelection[0]].value);
                        } else {
                            isMistake = true;
                        }

                        if (revealedValues.indexOf(this.cards[cardSelection[1]].value) === -1) {
                            revealedValues.push(this.cards[cardSelection[1]].value);
                        }

                        if (isMistake) {
                            this.mistakes++;
                        }

                        revealedValues.push(this.cards[cardSelection[0]].value);

                        status.code = 3,
                            status.message = 'Sin emparejar. Ocultar cartas.';
                        status.args = cardSelection;
                    } else {
                        revealedCards += 2;
                        if (revealedCards == this.cards.length) {
                            // Game over
                            this.isGameOver = true;
                            revealedCards = 0;
                            revealedValues = [];
                            status.code = 4,
                                status.message = 'Juego Terminado! Aciertos: ' + this.attempts +
                                ', Errores: ' + this.mistakes;
                            //prueba audio eparejado
                            pool.play();
                        } else {
                            status.code = 2,
                                status.message = 'Emparejado.';
                            //prueba audio eparejado
                            pool.play();
                        }
                    }
                    cardSelection = [];
                } else {
                    status.code = 1,
                        status.message = 'Voltear primera carta.';
                }
            } else {
                status.code = 0,
                    status.message = 'Carta mirando hacia arriba.';
            }

            return status;

        };
    })()
};