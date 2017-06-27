const { app, globalShortcut } = require( "electron" );
const EmojisWindow = require( "./emojis-window" );
const TrayIcon = require( "./tray-icon" );
const StartupLauncher = require("./startup-launcher");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, trayIcon, launcher;

app.on( "ready", function() {
    win = new EmojisWindow();
    launcher = new StartupLauncher();
    launcher.isAutoLaunch()
        .then(( autoLaunch ) => {
            trayIcon = new TrayIcon( autoLaunch,
                {
                    onClickShow: () => win.show(),
                    onClickQuit: () => app.quit(),
                    onClickLaunchAtStartup: () => 
                        launcher.toggleAutoLaunch( )
                        .then((autoLaunch) => trayIcon.updateContextMenu(autoLaunch))
                } );
        } );

    globalShortcut.register( "CommandOrControl+Alt+A", () => win.toggleShow() );
} );
