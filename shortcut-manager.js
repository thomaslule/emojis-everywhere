const { BrowserWindow, ipcMain } = require( "electron" );
const path = require( "path" );
const url = require( "url" );

let ShortcutManager = function() {
    ipcMain.on( "shortcut-changed", ( event, shortcut ) => {
        console.log( shortcut );
    } );
}

ShortcutManager.prototype.displayShortcutWindow = function() {
    let win = new BrowserWindow();
    win.loadURL( url.format( {
        pathname: path.join( __dirname, "shortcut-setter.html" ),
        protocol: "file:",
        slashes: true
    } ) );
    win.webContents.openDevTools();
}

module.exports = ShortcutManager;
