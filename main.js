const { app, BrowserWindow, Tray, Menu, globalShortcut, dialog } = require( "electron" );
const path = require( "path" );
const url = require( "url" );
const AutoLaunch = require( "auto-launch" );

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

app.on( "ready", function() {
    win = createWindow();

    const trayIconImg = path.join( __dirname, "build/icon.ico" );
    trayIcon = new Tray( trayIconImg );
    const contextMenu = Menu.buildFromTemplate( [
        {
            label: "Show",
            click: () => win.show()
        },
        {
            label: "Quit",
            click: app.quit
        }
    ] );
    trayIcon.setToolTip( "Emojis Everywhere" );
    trayIcon.setContextMenu( contextMenu );

    globalShortcut.register( "CommandOrControl+Alt+A", () => {
        if ( win.isVisible() ) {
            win.hide();
        } else {
            win.show();
        }
    } );
} );

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

let launcher = new AutoLaunch({ name: "Emojis Everywhere" });

launcher.enable();

launcher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    launcher.enable();
})
.catch(function(err){
    dialog.showErrorBox("Error", "An error happened: " + err);
});
