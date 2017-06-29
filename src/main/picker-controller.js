const { BrowserWindow } = require( "electron" );
const path = require( "path" );
const url = require( "url" );
const appRootDir = require("app-root-dir").get();

let PickerController = function() {
    // Create the browser window.
    this.win = new BrowserWindow( { fullscreen: true, transparent: true, frame: false, show: false } );

    // and load the index.html of the app.
    this.win.loadURL( url.format( {
        pathname: path.join( appRootDir, "src", "renderers", "picker.html" ),
        protocol: "file:",
        slashes: true
    } ) );

    // Open the DevTools.
    // this.win.webContents.openDevTools();
}

PickerController.prototype.toggleShow = function() {
    if ( this.win.isVisible() ) {
        this.win.hide();
    } else {
        this.show();
    }
}

PickerController.prototype.show = function() {
    this.win.show();
}

module.exports = PickerController;
