const { dialog } = require( "electron" );
const path = require( "path" );
const appRootDir = require( "app-root-dir" ).get();

module.exports = function() {
    let version = require( path.join( appRootDir, "package.json" ) ).version;
    dialog.showMessageBox( {
        icon: path.join( appRootDir, "build", "icon.ico" ),
        message: `Emoji Everywhere version ${version} by Thomas Lulé\n` +
        "Emoji picker supplied by Tom Moor\n" +
        "Emoji icons supplied by EmojiOne"
    } );
}
