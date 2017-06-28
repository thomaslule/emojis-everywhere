const { dialog } = require( "electron" );
const AutoLaunch = require( "auto-launch" );

let StartupLauncher = function() {
    this.autoLaunch = new AutoLaunch( { name: "Emojis Everywhere" } );
}

StartupLauncher.prototype.isAutoLaunch = function() {
    return this.autoLaunch.isEnabled()
        .catch( function( err ) {
            dialog.showErrorBox( "Error", err );
        } );
}

StartupLauncher.prototype.enableAutoLaunch = function() {
    this.autoLaunch.enable();
}

StartupLauncher.prototype.toggleAutoLaunch = function() {
    return this.isAutoLaunch()
        .then(( autoLaunch ) => {
            if ( autoLaunch ) {
                this.autoLaunch.disable();
                return false;
            } else {
                this.autoLaunch.enable();
                return true;
            }
        } );
}

module.exports = StartupLauncher;
