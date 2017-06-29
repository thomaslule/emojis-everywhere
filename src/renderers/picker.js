const { clipboard, remote, ipcRenderer } = require( "electron" );
const React = require( "react" );
const ReactDOM = require( "react-dom" );
const createReactClass = require( "create-react-class" );
const EmojiPicker = require( "emojione-picker" ).default;
const ClickOutside = require( "react-click-outside" ).default;

const App = createReactClass( {

    getInitialState: function() {
        return { key: Math.random() };
    },

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
                },
                key: this.state.key
            } ),

            React.createElement( "p", { className: "instructions" },
                "Click an emoji to copy it to your clipboard.",
                React.createElement( "br" ),
                "Paste it everywhere."
            )
        );
    },

    componentDidMount: function() {
        ipcRenderer.on( "picker-showed", ( event, message ) => {
            // force the picker to re-render to clear its previous search and set focus to the field
            this.setState( { key: Math.random() } );
        } );
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

document.body.addEventListener( "keydown", ( e ) => {
    if ( e.keyCode == 27 ) { // ESCAPE
        remote.getCurrentWindow().hide();
    }
} );
