const { clipboard, remote } = require( "electron" );
const React = require( "react" );
const ReactDOM = require( "react-dom" );
const createReactClass = require( "create-react-class" );
const EmojiPicker = require( "emojione-picker" ).default;
const ClickOutside = require( "react-click-outside" ).default;

const App = createReactClass( {

    render: function() {
        return React.createElement(

            ClickOutside,
            { className: "App", onClickOutside: this.handleClickOutside },

            React.createElement( EmojiPicker, {
                onChange: this.handleChange,
                search: true,
                emojione: {
                    imageType: 'png',
                    sprites: true
                }
            } )
        );
    },

    handleChange: function( data ) {
        clipboard.writeText( String.fromCodePoint( +( "0x" + data.unicode ) ) );
        remote.getCurrentWindow().hide();
    },

    handleClickOutside: function( event ) {
        remote.getCurrentWindow().hide();
    }

} );

ReactDOM.render(
    React.createElement( App ),
    document.getElementById( "root" ) );
