const { Tray, Menu } = require( "electron" );
const path = require( "path" );

let TrayIcon = function( launchAtStartup, callbacks ) {
    this.callbacks = callbacks;
    this.tray = new Tray( path.join( __dirname, "build/icon.ico" ) );
    this.tray.setToolTip( "Emojis Everywhere" );
    this.updateContextMenu( launchAtStartup );
}

TrayIcon.prototype.updateContextMenu = function( launchAtStartup ) {
    const contextMenu = Menu.buildFromTemplate( [
        {
            label: "Launch at startup",
            type: "checkbox",
            checked: launchAtStartup,
            click: this.callbacks.onClickLaunchAtStartup
        },
        {
            label: "Set global shortcut",
            click: this.callbacks.onClickSetGlobalShortcut
        },
        {
            label: "Show",
            click: this.callbacks.onClickShow
        },
        {
            label: "Quit",
            click: this.callbacks.onClickQuit
        }
    ] );
    this.tray.setContextMenu( contextMenu );
}

module.exports = TrayIcon;
