const { Tray, Menu } = require( "electron" );
const path = require( "path" );
const appRootDir = require( "app-root-dir" ).get();

let TrayIcon = function( launchAtStartup, callbacks ) {
    this.callbacks = callbacks;
    this.tray = new Tray( path.join( appRootDir, "assets", "icon.ico" ) );
    this.tray.setToolTip( "Emojis Everywhere" );
    this.tray.on("click", this.callbacks.onClickShow);
    this.updateContextMenu( launchAtStartup );
}

TrayIcon.prototype.updateContextMenu = function( launchAtStartup ) {
    const contextMenu = Menu.buildFromTemplate( [
        {
            label: "About",
            click: this.callbacks.onClickAbout
        },
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
