/**
 * Created by adubois on 26/11/15.
 */
var PalettoTestCase64 = TestCase("PalettoTestCase64");
PalettoTestCase64.prototype.testStory8 = function () {
    console.log("cocuou");
    var e = new  Engine(false,  true);

    assertTrue(e.getSize() == 8);
    for (var i = 0 ; i < e.getSize() - 1 ; i++) {
        for (var j = 0; j < e.getSize() - 1; j++) {
            assertNotEquals(e.getCaseb(i, j), e.getCaseb(i + 1, j));
            assertNotEquals(e.getCaseb(i, j), e.getCaseb(i, j + 1));
        }
    }
};
