// author : Amaury Dubois
'use strict';

var Engine = function () {
    var plateau;
    var size = 0;
// private attributes and methods
    var init = function(){
        plateau = new Array(6);
        size = 6;

        for (var i = 0; i < size; i++ ){
            plateau[i] = new Array(6);
        }
        this.placeColor();
    }

// public methods
    this.placeColor =
    this.getSize = function(){
        return size;
    }

    init();
};
