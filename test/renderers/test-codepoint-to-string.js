const expect = require( "chai" ).expect;
const codePointToString = require( "../../src/renderers/codepoint-to-string" );

describe( "codePointToString", function() {

    it( "should handle simple emoji", function() {
        expect(codePointToString("1f477")).to.equal("👷");
    } );

    it( "should handle combined emoji", function() {
        expect(codePointToString("1f477-1f3ff")).to.equal("👷🏿");
    } );

});
