// author : Amaury Dubois
'use strict';

var Engine = function () {
    var plateau;
    var size = 0;
    var Black = 1;
    var Red = 2;
    var Green = 3;
    var Blue = 4;
    var White = 5;
    var Yellow = 6;
// private attributes and methods

    var placeColor = function () {
        plateau[0][0] = plateau [2][4] = plateau [3][1] = plateau [4][3] = plateau[5][2] =plateau [5][5] = Black;
        plateau[0][4] = plateau [1][3] = plateau [3][0] = plateau [3][2] = plateau[5][3] = Red;
        plateau[0][1] = plateau [1][2] = plateau [3][3] = plateau [4][1] = plateau[4][5] =plateau [5][4] = Green;
        plateau[0][3] = plateau [1][5] = plateau [2][0] = plateau [2][2] = plateau[3][4] =plateau [5][1] = Blue;
        plateau[0][2] = plateau [0][5] = plateau [1][1] = plateau [2][3] = plateau[4][5] =plateau [4][0] = White;
        plateau[1][0] = plateau [1][4] = plateau [2][1] = plateau [4][2] = plateau[4][4] =plateau [0][5] = Yellow;
    };

    var init = function(){
        plateau = new Array(6);
        size = 6;

        for (var i = 0; i < size; i++ ){
            plateau[i] = new Array(6);
        }
        placeColor();
    };


// public methods
    this.getCase = function (i ,j) {
        return plateau [i][j];
    };

    this.getSize = function(){
        return size;
    };

    init();
};
