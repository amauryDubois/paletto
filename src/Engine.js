// author : Amaury Dubois
'use strict';

var Engine = function () {
    var plateau, size = 0, nbCase, color, player1, player2, current;

// private attributes and methods
    color = {black: 0, green: 1, white: 2, blue: 3, red: 4, yel: 5};
    var placeColor = function () {
        plateau = [
            [color.black, color.green, color.white, color.blue, color.red, color.white],
            [color.yel, color.white, color.green, color.red, color.yel, color.blue],
            [color.blue, color.yel, color.blue, color.white, color.black, color.red],
            [color.red, color.black, color.red, color.green, color.blue, color.white],
            [color.white, color.green, color.yel, color.black, color.yel, color.green],
            [color.yel, color.blue, color.black, color.red, color.green, color.black]
        ];
    };

    var init = function () {
        player1 = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        player2 = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        current = player1;
        nbCase = 36;
        plateau = new Array(6);
        size = 6;

        for (var i = 0; i < size; i++) {
            plateau[i] = new Array(6);
        }
        placeColor();
    };


// public methods
    this.convertCoup = function (coord) {
        var ligne = coord.charCodeAt(1) - 49;
        var col = coord.charCodeAt(0) - 65;
        return {line: ligne, colone: col};
    };

    this.play = function (coord) {
        var coup = this.convertCoup(coord);
        this.setPlayerScore(this.getCase(coup.line, coup.colone));
        this.setCase(coup.line, coup.colone, -1);
        nbCase -= 1;
        this.changeTurn();
    };

    this.getCurrentPlayer = function () {
        return current;
    };

    this.changeTurn = function () {
        current = (current === player1 ) ? player2 : player1;
    };

    this.setPlayerScore = function (pickcolor) {
        var p = this.getCurrentPlayer(), c = this.getColor(), color, player = this.getCurrentPlayer();
        for (var couleur in c) {
            if (pickcolor == c[couleur]) {
                color = couleur;
            }
        }
        player[color]++;
    };

    this.setCase = function (ligne, col, coul) {
        plateau[ligne][col] = coul;
    };

    this.getCase = function (i, j) {
        return plateau [i][j];
    };
    this.getCaseCoord = function (coup) {
        var coord = this.convertCoup(coup);
        return plateau[coord.line][coord.colone];
    };

    this.getSize = function () {
        return size;
    };

    this.getColor = function () {
        return color;
    };

    this.getnBCase = function () {
        return nbCase;
    };

    init();
};
