const { BrowserWindow } = require( "electron" );
const path = require( "path" );
const url = require( "url" );

let PickerWindow = function() {
    // Create the browser window.
    this.win = new BrowserWindow( { fullscreen: true, transparent: true, frame: false, show: false } );

    // and load the index.html of the app.
    this.win.loadURL( url.format( {
        pathname: path.join( __dirname, "index.html" ),
        protocol: "file:",
        slashes: true
    } ) );

    // Open the DevTools.
    // win.webContents.openDevTools()
}

PickerWindow.prototype.toggleShow = function() {
    if ( this.win.isVisible() ) {
        this.win.hide();
    } else {
        this.win.show();
    }
}

PickerWindow.prototype.show = function() {
    this.win.show();
}

module.exports = PickerWindow;
