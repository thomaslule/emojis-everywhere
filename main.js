const { app, globalShortcut, dialog } = require( "electron" );
const AutoLaunch = require( "auto-launch" );
const EmojisWindow = require( "./emojis-window.js" );
const TrayIcon = require( "./tray-icon.js" );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, trayIcon;
let launcher = new AutoLaunch( { name: "Emojis Everywhere" } );

app.on( "ready", function() {
    win = new EmojisWindow();
    launcher.isEnabled()
        .then(( isEnabled ) => {
            trayIcon = new TrayIcon( isEnabled,
                {
                    onClickShow: () => win.show(),
                    onClickQuit: () => app.quit(),
                    onClickLaunchAtStartup: () => toggleLaunchAtStartup( trayIcon )
                } );
        } )
        .catch( function( err ) {
            dialog.showErrorBox( "Error", err );
        } );

    globalShortcut.register( "CommandOrControl+Alt+A", () => win.toggleShow() );
} );

function toggleLaunchAtStartup( trayIcon ) {
    launcher.isEnabled()
        .then(( isEnabled ) => {
            if ( isEnabled ) {
                launcher.disable()
                trayIcon.updateContextMenu( false );
            } else {
                launcher.enable();
                trayIcon.updateContextMenu( true );
            }
        } )
        .catch( function( err ) {
            dialog.showErrorBox( "Error", err );
        } );
}
