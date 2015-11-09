// author : Amaury Dubois
'use strict';

var Engine = function () {
    var plateau;
    var size = 0;
    var color;
// private attributes and methods
    color ={black :0, green :1, white:2 , blue: 3 , red: 4, yel:5};
    var placeColor = function () {
        plateau = [
            [color.black,color.green,color.white,color.blue,color.red,color.white],
            [color.yel,color.white,color.green,color.red,color.yel,color.blue],
            [color.blue,color.yel,color.blue,color.white,color.black,color.red],
            [color.red,color.black,color.red,color.green,color.blue,color.white],
            [color.white,color.green,color.yel,color.black,color.yel,color.green],
            [color.yel,color.blue,color.black,color.red,color.green,color.black]
            ];
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
    this.getColor = function () {
        return color;
    }
    init();
};
