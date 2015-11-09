'use strict';

var PalettoTestCase = TestCase("PalettoTestCase");

PalettoTestCase.prototype.testStory1 = function () {

    var e = new Engine();

    assertTrue(e.getCase(0,0) === 1);
    assertTrue(e.getCase(0,3) === 2);
    assertTrue(e.getCase(0,1) === 3);
    assertTrue(e.getCase(0,1) === 4);
    assertTrue(e.getCase(0,2) === 5);
    assertTrue(e.getCase(1,0) === 6);
};