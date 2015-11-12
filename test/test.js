'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {

    var e = new Engine();
    for (var i = 0 ; i < e.getSize() - 1 ; i++) {
        for (var j = 0; j < e.getSize() - 1; j++) {
            assertNotEquals(e.getCase(i, j), e.getCase(i + 1, j));
            assertNotEquals(e.getCase(i, j), e.getCase(i, j + 1));
        }
    }

};

PalettoTestCase.prototype.testStory2 = function () {
    var e = new  Engine();
    console.log(e.getCase(5,0));
    assertTrue(e.getCase(5,0) === e.getColor().yel);
};