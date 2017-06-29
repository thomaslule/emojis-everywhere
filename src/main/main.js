const { app } = require( "electron" );
const settings = require( "electron-settings" );
const PickerController = require( "./picker-controller" );
const TrayIcon = require( "./tray-icon" );
const StartupLauncher = require( "./startup-launcher" );
const ShortcutController = require( "./shortcut-controller" );
const about = require("./about");

let EmojiEverywhere = function( app ) {
    this.app = app;
    this.app.on( "ready", () => this.initialize() );
}

EmojiEverywhere.prototype.initialize = function() {
    this.pickerController = new PickerController();
    this.shortcutController = new ShortcutController(() => this.pickerController.toggleShow() );
    this.launcher = new StartupLauncher();

    if ( !settings.has( "already-launched" ) ) {
        // first launch!
        settings.set( "already-launched", true );
        this.launcher.enableAutoLaunch();
        this.createTrayIcon( true );
    } else {
        this.launcher.isAutoLaunch()
            .then(( autoLaunch ) => this.createTrayIcon( autoLaunch ) );
    }
}

EmojiEverywhere.prototype.createTrayIcon = function( autoLaunch ) {
    this.trayIcon = new TrayIcon( autoLaunch,
        {
            onClickShow: () => this.pickerController.show(),
            onClickQuit: () => this.app.quit(),
            onClickAbout: () => about(),
            onClickSetGlobalShortcut: () => this.shortcutController.displayShortcutWindow(),
            onClickLaunchAtStartup: () => this.launcher.toggleAutoLaunch()
                .then(( autoLaunch ) => this.trayIcon.updateContextMenu( autoLaunch ) )
        } );
}

// keep a reference to avoid garbage collecting
let ee = new EmojiEverywhere( app );
