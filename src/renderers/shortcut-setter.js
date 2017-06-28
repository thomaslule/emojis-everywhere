const React = require( "react" );
const ReactDOM = require( "react-dom" );
const createReactClass = require( "create-react-class" );
const { ipcRenderer, remote } = require( "electron" );

const ShortcutSetter = createReactClass( {
    getInitialState: function() {
        return {
            shortcut: ""
        };
    },

    render: function() {
        return React.createElement( "div", null,
            React.createElement( "input", {
                type: "text",
                onKeyDown: ( e ) => this.handleKeyDown( e ),
                value: this.state.shortcut
            } ),
            React.createElement( "button", {
                onClick: () => this.handleOK()
            }, "OK" )
        );
    },

    handleKeyDown: function( e ) {
        let shortcut =
            ( e.ctrlKey ? "Control " : "" ) +
            ( e.shiftKey ? "Shift " : "" ) +
            ( e.altKey ? "Alt " : "" ) +
            ( e.metaKey ? "Meta " : "" ) +
            ( [16, 17, 18, 91].indexOf( e.keyCode ) < 0 ? String.fromCharCode( e.keyCode ) : "" );
        this.setState( {
            shortcut: shortcut
        } );
        e.stopPropagation();
        e.preventDefault()
    },

    handleOK: function() {
        ipcRenderer.send( "shortcut-changed", this.state.shortcut );
        remote.getCurrentWindow().close();
    }
} );

ReactDOM.render(
    React.createElement( ShortcutSetter ),
    document.getElementById( "root" ) );
