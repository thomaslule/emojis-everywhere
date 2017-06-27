const { app, BrowserWindow, Tray, Menu, globalShortcut, dialog } = require( "electron" );
const path = require( "path" );
const url = require( "url" );
const AutoLaunch = require( "auto-launch" );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let launcher = new AutoLaunch( { name: "Emojis Everywhere" } );

app.on( "ready", function() {
    win = createWindow();
    let trayIcon = createTrayIcon();

    globalShortcut.register( "CommandOrControl+Alt+A", () => {
        if ( win.isVisible() ) {
            win.hide();
        } else {
            win.show();
        }
    } );
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

function createWindow() {

    // Create the browser window.
    let win = new BrowserWindow( { fullscreen: true, transparent: true, frame: false, show: false } );

    // and load the index.html of the app.
    win.loadURL( url.format( {
        pathname: path.join( __dirname, "index.html" ),
        protocol: "file:",
        slashes: true
    } ) );

    // Open the DevTools.
    // win.webContents.openDevTools()

    return win;
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
