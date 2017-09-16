/**
 * Descripcion: Este es un juego de memoria escrito en JavaScript puro
 * El objetivo es emparejar pared de cartas en el menor número de pasos
 * de enparejamiento.

 */

MemoryGame.Card = function(value) {
    this.value = value;
    this.isRevealed = false;

    this.reveal = function() {
        this.isRevealed = true;
    }

    this.conceal = function() {
        this.isRevealed = false;
    }
};