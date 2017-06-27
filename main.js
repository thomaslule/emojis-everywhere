const { app, globalShortcut } = require( "electron" );
const PickerWindow = require( "./picker-window" );
const TrayIcon = require( "./tray-icon" );
const StartupLauncher = require( "./startup-launcher" );
const ShortcutManager = require( "./shortcut-manager" );

let EmojiEverywhere = function( app ) {
    this.app = app;
    this.app.on( "ready", () => this.initialize() );
}

EmojiEverywhere.prototype.initialize = function() {
    this.picker = new PickerWindow();
    this.shortcutManager = new ShortcutManager();
    this.launcher = new StartupLauncher();
    this.launcher.isAutoLaunch()
        .then(( autoLaunch ) => this.createTrayIcon( autoLaunch ) );

    globalShortcut.register( "CommandOrControl+Alt+A", () => this.picker.toggleShow() );
}

EmojiEverywhere.prototype.createTrayIcon = function( autoLaunch ) {
    this.trayIcon = new TrayIcon( autoLaunch,
        {
            onClickShow: () => this.picker.show(),
            onClickQuit: () => this.app.quit(),
            onClickSetGlobalShortcut: () => this.shortcutManager.displayShortcutWindow(),
            onClickLaunchAtStartup: () => this.launcher.toggleAutoLaunch()
                .then(( autoLaunch ) => this.trayIcon.updateContextMenu( autoLaunch ) )
        } );
}

// keep a reference to avoid garbage collecting
let ee = new EmojiEverywhere( app );
