const expect = require( "chai" ).expect;
const eventToShortcut = require( "../../src/renderers/event-to-shortcut" );

describe( "eventToShortcut", function() {
    
    // The aim is to handle all accelerator keys https://github.com/electron/electron/blob/master/docs/api/accelerator.md
    // Punctuation looks tricky, don't handle it for now

    it( "should handle classic key presses", function() {
        expect(eventToShortcut( { keyCode: 70 } )).to.equal("F");
        expect(eventToShortcut( { keyCode: 53 } )).to.equal("5");
        expect(eventToShortcut( { keyCode: 101 } )).to.equal("5");
    } );

    it( "should handle special key presses", function() {
        expect(eventToShortcut( { keyCode: 114 } )).to.equal("F3");
        expect(eventToShortcut( { keyCode: 107 } )).to.equal("Plus");
        expect(eventToShortcut( { keyCode: 32 } )).to.equal("Space");
        expect(eventToShortcut( { keyCode: 9 } )).to.equal("Tab");
        expect(eventToShortcut( { keyCode: 8 } )).to.equal("Backspace");
        expect(eventToShortcut( { keyCode: 46 } )).to.equal("Delete");
        expect(eventToShortcut( { keyCode: 45 } )).to.equal("Insert");
        expect(eventToShortcut( { keyCode: 13 } )).to.equal("Return");
        expect(eventToShortcut( { keyCode: 38 } )).to.equal("Up");
        expect(eventToShortcut( { keyCode: 40 } )).to.equal("Down");
        expect(eventToShortcut( { keyCode: 37 } )).to.equal("Left");
        expect(eventToShortcut( { keyCode: 39 } )).to.equal("Right");
        expect(eventToShortcut( { keyCode: 36 } )).to.equal("Home");
        expect(eventToShortcut( { keyCode: 35 } )).to.equal("End");
        expect(eventToShortcut( { keyCode: 33 } )).to.equal("PageUp");
        expect(eventToShortcut( { keyCode: 34 } )).to.equal("PageDown");
        expect(eventToShortcut( { keyCode: 27 } )).to.equal("Escape");
        expect(eventToShortcut( { keyCode: 183 } )).to.equal("VolumeUp");
        expect(eventToShortcut( { keyCode: 182 } )).to.equal("VolumeDown");
        expect(eventToShortcut( { keyCode: 181 } )).to.equal("VolumeMute");
        expect(eventToShortcut( { keyCode: 44 } )).to.equal("PrintScreen");
    } );
    
    it ("should handle modifiers", function() {
        expect(eventToShortcut( { keyCode: 70, ctrlKey: true } )).to.equal("Control+F");
        expect(eventToShortcut( { keyCode: 70, ctrlKey: true, shiftKey: true } )).to.equal("Control+Shift+F");
    });
    
    it ("should handle modifiers alone", function() {
        expect(eventToShortcut( { keyCode: 17, ctrlKey: true } )).to.equal("Control");
        expect(eventToShortcut( { keyCode: 18, shiftKey: true } )).to.equal("Shift");
        expect(eventToShortcut( { keyCode: 16, altKey: true } )).to.equal("Alt");
        expect(eventToShortcut( { keyCode: 91, metaKey: true } )).to.equal("Super");
        // 6 (HELP) is not supported
        expect(eventToShortcut( { keyCode: 6, metaKey: true } )).to.equal("Super");
    });
    
    it ("should return empty string for unsupported keys", function() {
        expect(eventToShortcut( { keyCode: 6 } )).to.equal("");
    });

} );
