'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {

    var e = new Engine(false);
    for (var i = 0 ; i < e.getSize() - 1 ; i++) {
        for (var j = 0; j < e.getSize() - 1; j++) {
            assertNotEquals(e.getCase(i, j), e.getCase(i + 1, j));
            assertNotEquals(e.getCase(i, j), e.getCase(i, j + 1));
        }
    }

};

PalettoTestCase.prototype.testStory2 = function () {
    var e = new  Engine(false);
    assertTrue(e.getCase(5,0) === e.getColor().yel);
};

PalettoTestCase.prototype.testStory3 = function () {
    var e = new  Engine(false);
    e.play("A6");
    assertTrue(e.getnBCase() === 35);
    assertTrue(e.getCaseCoord("A6") == 'X');


};

PalettoTestCase.prototype.testStory4 = function () {
    var e = new  Engine(false), c;
    e.play("A6");
    var possible = e.getAllowColors();
    assertTrue(possible.indexOf('black') !==-1 );
    assertTrue(possible.indexOf('white') !==-1 );
    assertTrue(possible.indexOf('blue') !==-1 );
    e.changeTurn();
    assertTrue(e.getCurrentPlayer() === 1);

    e.play("A1");
    e.play("F6");
    assertTrue(e.getPlayerScore().black === 2);
    e.changeTurn();

    assertTrue(e.getCurrentPlayer() === 0);
    assertTrue(e.getnBCase() === 33);
};

PalettoTestCase.prototype.testStory5 = function () {
    var e = new  Engine(true);
    e.play("A4");
    assertFalse(e.play("C3"));
    assertTrue(e.getnBCase() === 13);
};