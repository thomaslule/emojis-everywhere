const { app, Tray, Menu, globalShortcut, dialog } = require( "electron" );
const path = require( "path" );
const AutoLaunch = require( "auto-launch" );
const EmojisWindow = require( "./emojis-window.js" );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let launcher = new AutoLaunch( { name: "Emojis Everywhere" } );

app.on( "ready", function() {
    win = new EmojisWindow();
    let trayIcon = createTrayIcon();

    globalShortcut.register( "CommandOrControl+Alt+A", () => win.toggleShow() );
} );

function createTrayIcon() {
    trayIcon = new Tray( path.join( __dirname, "build/icon.ico" ) );
    trayIcon.setToolTip( "Emojis Everywhere" );
    setContextMenu( trayIcon );

    return trayIcon;
}

function setContextMenu( trayIcon ) {
    launcher.isEnabled()
        .then(( isEnabled ) => {
            const contextMenu = Menu.buildFromTemplate( [
                {
                    label: "Launch at startup",
                    type: "checkbox",
                    checked: isEnabled,
                    click: () => toggleLaunchAtStartup( trayIcon )
                },
                {
                    label: "Show",
                    click: () => win.show()
                },
                {
                    label: "Quit",
                    click: app.quit
                }
            ] );
            trayIcon.setContextMenu( contextMenu );
        } )
        .catch( function( err ) {
            dialog.showErrorBox( "Error", err );
        } );
}

function toggleLaunchAtStartup( trayIcon ) {
    launcher.isEnabled()
        .then(( isEnabled ) => {
            if ( isEnabled ) {
                launcher.disable()
            } else {
                launcher.enable();
            }
            setContextMenu( trayIcon );
        } )
        .catch( function( err ) {
            dialog.showErrorBox( "Error", err );
        } );
}
