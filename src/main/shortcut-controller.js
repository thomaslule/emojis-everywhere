const { BrowserWindow, ipcMain, globalShortcut } = require( "electron" );
const path = require( "path" );
const url = require( "url" );
const appRootDir = require( "app-root-dir" ).get();
const settings = require( "electron-settings" );

let ShortcutController = function( onShortcut ) {
    this.onShortcut = onShortcut;
    if ( settings.has( "shortcut" ) ) {
        this.updateShortcut( settings.get( "shortcut" ) );
    } else {
        this.updateShortcut( "CommandOrControl+Alt+S" );
    }
    ipcMain.on( "shortcut-changed", ( event, shortcut ) => this.updateShortcut( shortcut ));
}

ShortcutController.prototype.displayShortcutWindow = function() {
    let win = new BrowserWindow();
    win.loadURL( url.format( {
        pathname: path.join( appRootDir, "src", "renderers", "shortcut-setter.html" ),
        search: `shortcut=${settings.get( "shortcut" )}`,
        protocol: "file:",
        slashes: true
    } ) );
    // win.webContents.openDevTools();
}

ShortcutController.prototype.updateShortcut = function( shortcut ) {
    settings.set( "shortcut", shortcut );
    globalShortcut.unregisterAll();
    globalShortcut.register( shortcut, this.onShortcut );
}

module.exports = ShortcutController;
