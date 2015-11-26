// author : Amaury Dubois
'use strict';

var Engine = function (intermediaire) {
    var plateau, size = 0, nbCase, color, players = [], current, nbBille;

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
    var placeColorI = function () {
        plateau = [
            ['X', 'X', 'X', color.blue, color.red, color.white],
            ['X', 'X', 'X', color.red, color.yel, 'X'],
            ['X', 'X', color.blue, color.white, color.black, 'X'],
            [color.red, color.black, color.red, 'X', 'X', 'X'],
            ['X', color.green, color.yel, 'X', 'X', 'X'],
            ['X', 'X', color.black, 'X', 'X', 'X']
        ];
    };
    var initI = function () {
        var i;
        players[0] = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        players[1] = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        current = 0;
        nbCase = 14;
        plateau = new Array(6);
        size = 6;

        for (i = 0; i < size; i++) {
            plateau[i] = new Array(6);
        }
        placeColorI();
    };
    var init = function () {
        var i;
        players[0] = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        players[1] = {black: 0, green: 0, white: 0, blue: 0, red: 0, yel: 0};
        current = 0;
        nbCase = 36;
        nbBille = 36;
        plateau = new Array(6);
        size = 6;

        for (i = 0; i < size; i++) {
            plateau[i] = new Array(6);
        }
        placeColor();
    };
    var merde = function (caca, vaTeFaire) {
        if (caca.indexOf(vaTeFaire) === -1) {
            caca.push(vaTeFaire);
        }
    };
    var compterVoisinHaut = function (ligne, col) {
        if (ligne > 0 && plateau[ligne - 1][col] !== 'X') {
            return 1;
        }
        return 0;
    };
    var compterVoisinBas = function (ligne, col) {
        if (ligne < 5 && plateau[ligne + 1][col] !== 'X') {
            return 1;
        }
        return 0;
    };
    var compterVoisinGauche = function (ligne, col) {
        if (col > 0 && plateau[ligne][col - 1] !== 'X') {
            return 1;
        }
        return 0;
    };
    var compterVoisindroit = function (ligne, col) {
        if (col < 5 && plateau[ligne][col + 1] !== 'X') {
            return 1;
        }
        return 0;
    };
    var compterVoisin = function (ligne, col) {
        var cpt = compterVoisinBas(ligne, col) +
            compterVoisinHaut(ligne, col) +
            compterVoisinGauche(ligne, col) +
            compterVoisindroit(ligne, col);
        return cpt;
    };
    var setAllowColor = function (rep, ligne, col) {
        var pickcolor = plateau[ligne][col], couleur, c;
        for (couleur in color) {
            if (pickcolor === color[couleur]) {
                c = couleur;
            }
        }
        merde(rep, c);
    };

    var isNotEmpty = function (rep, ligne, col) {
        if (plateau[ligne][col] != 'X') {
            if (compterVoisin(ligne, col) <= 2) {
                setAllowColor(rep, ligne, col);
            }
        }
    };
    var allowToPlay = function (coup) {

        var cpt = compterVoisin(coup.line, coup.colone);
        if (cpt === 1) {
            return true;
        }
    };
// public methods
    this.convertCoup = function (coord) {
        var ligne = coord.charCodeAt(1) - 49;
        var col = coord.charCodeAt(0) - 65;
        return {line: ligne, colone: col};
    };

    this.play = function (coord) {
        var coup = this.convertCoup(coord);
        allowToPlay(coup);
        if (this.possible(coup)) {

            this.setPlayerScore(this.getCase(coup.line, coup.colone));
            this.setCase(coup.line, coup.colone, 'X');
            nbCase -= 1;
            return true;
        } else {

            return false;
        }


    };

    this.possible = function (coup) {
        var cpt = compterVoisin(coup.line, coup.colone);
        console.log("voisin" + cpt);
        if (cpt <= 1) return true;
        if (cpt > 2) return false;
        return this.otherwise(coup);
    };
    this.getCurrentPlayer = function () {
        return current;
    };

    this.changeTurn = function () {
        current = (current === 0) ? 1 : 0;
    };

    this.setPlayerScore = function (pickcolor) {
        var p = players[this.getCurrentPlayer()], c = this.getColor(), col;
        for (var couleur in c) {
            if (pickcolor === c[couleur]) {
                col = couleur;
            }
        }
        p[col]++;
    };
    this.getPlayerScore = function () {
        return players[this.getCurrentPlayer()];
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

    this.getAllowColors = function () {
        var ligne, col, rep = [];
        for (ligne = 0; ligne < 6; ligne++) {
            for (col = 0; col < 6; col++) {
                isNotEmpty(rep, ligne, col);
            }
        }
        return rep;
    };

    this.otherwise = function (coup) {
        var cpt = 0;
        cpt = compterVoisinBas(coup.line, coup.colone) + compterVoisinHaut(coup.line, coup.colone);
        if (cpt === 2) return false;
        cpt = 0;
        cpt = compterVoisinGauche(coup.line, coup.colone) + compterVoisindroit(coup.line, coup.colone);
        if (cpt === 2) return false;
        return this.diagonal(coup);
    };
    this.diagonal = function (coup) {
        var cpt = compterVoisinHaut(coup.line, coup.colone) + compterVoisindroit(coup.line, coup.colone);
        if (cpt === 2) return this.diagonalHD(coup);
        cpt = compterVoisinHaut(coup.line, coup.colone) + compterVoisinGauche(coup.line, coup.colone);
        if (cpt === 2) return this.diagonalHG(coup);
        cpt = compterVoisinBas(coup.line, coup.colone) + compterVoisindroit(coup.line, coup.colone);
        if (cpt === 2) return this.diagonalBD(coup);
        cpt = compterVoisinBas(coup.line, coup.colone) + compterVoisinGauche(coup.line, coup.colone);
        if (cpt === 2) return this.diagonalBG(coup);
    };
    this.diagonalHD = function (coup) {
        if (this.getCase(coup.line - 1, coup.colone + 1) != "X") {
            return true;
        }
        return false;
    };
    this.diagonalHG = function (coup) {
        if (this.getCase(coup.line - 1, coup.colone - 1) != "X") {
            return true;
        }
        return false;
    };
    this.diagonalBD = function (coup) {
        console.log(this.getCase(coup.line + 1, coup.colone + 1));
        if (this.getCase(coup.line + 1, coup.colone + 1) != "X") {
            return true;
        }
        return false;
    };
    this.diagonalBG = function (coup) {
        if (this.getCase(coup.line + 1, coup.colone - 1) != "X") {
            return true;
        }
        return false;
    };

    this.CheckIfWin = function () {
        var score = this.getPlayerScore();

        for (var i in score) {
            console.log("score" + score[i]);
            if (score[i] === 6) {
                return true;
            }
        }
        return false;
    };

    this.CheckNull = function () {
        var res = this.getnBCase();
        return (res === 0 ) ? true : false;
    };

    if (intermediaire) {
        initI();
    } else {
        init();
    }

};




