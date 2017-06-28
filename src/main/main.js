const { app } = require( "electron" );
const PickerController = require( "./picker-controller" );
const TrayIcon = require( "./tray-icon" );
const StartupLauncher = require( "./startup-launcher" );
const ShortcutController = require( "./shortcut-controller" );

let EmojiEverywhere = function( app ) {
    this.app = app;
    this.app.on( "ready", () => this.initialize() );
}

EmojiEverywhere.prototype.initialize = function() {
    this.pickerController = new PickerController();
    this.shortcutController = new ShortcutController(() => this.pickerController.toggleShow());
    this.launcher = new StartupLauncher();
    this.launcher.isAutoLaunch()
        .then(( autoLaunch ) => this.createTrayIcon( autoLaunch ) );
}

EmojiEverywhere.prototype.createTrayIcon = function( autoLaunch ) {
    this.trayIcon = new TrayIcon( autoLaunch,
        {
            onClickShow: () => this.pickerController.show(),
            onClickQuit: () => this.app.quit(),
            onClickSetGlobalShortcut: () => this.shortcutController.displayShortcutWindow(),
            onClickLaunchAtStartup: () => this.launcher.toggleAutoLaunch()
                .then(( autoLaunch ) => this.trayIcon.updateContextMenu( autoLaunch ) )
        } );
}

// keep a reference to avoid garbage collecting
let ee = new EmojiEverywhere( app );
