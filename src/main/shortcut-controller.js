const { BrowserWindow, ipcMain } = require( "electron" );
const path = require( "path" );
const url = require( "url" );
const appRootDir = require("app-root-dir").get();

let ShortcutController = function() {
    ipcMain.on( "shortcut-changed", ( event, shortcut ) => {
        console.log( shortcut );
    } );
}

ShortcutController.prototype.displayShortcutWindow = function() {
    let win = new BrowserWindow();
    win.loadURL( url.format( {
        pathname: path.join( appRootDir, "src", "renderers", "shortcut-setter.html" ),
        protocol: "file:",
        slashes: true
    } ) );
    win.webContents.openDevTools();
}

module.exports = ShortcutController;
