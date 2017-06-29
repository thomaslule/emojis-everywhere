const React = require( "react" );
const ReactDOM = require( "react-dom" );
const createReactClass = require( "create-react-class" );
const { ipcRenderer, remote } = require( "electron" );
const eventToShortcut = require("./event-to-shortcut");

const ShortcutSetter = createReactClass( {
    getInitialState: function() {
        return {
            shortcut: ""
        };
    },
    
    render: function() {
        return React.createElement( "div", null,
            React.createElement( "p", { className: "current" }, "Current shortcut is: " + this.getCurrentShortcut()),
            React.createElement( "input", {
                type: "text",
                onKeyDown: ( e ) => this.handleKeyDown( e ),
                value: this.state.shortcut,
                placeholder: "New shortcut",
                ref: (input) => { this.input = input; }
            } ),
            React.createElement( "button", {
                onClick: () => this.handleOK()
            }, "OK" ),
            React.createElement( "button", {
                onClick: () => this.handleCancel()
            }, "Cancel" )
        );
    },

    componentDidMount: function() {
        this.input.focus();
    },

    handleKeyDown: function( e ) {
        this.setState( {
            shortcut: eventToShortcut(e)
        } );
        e.stopPropagation();
        e.preventDefault()
    },

    handleOK: function() {
        ipcRenderer.send( "shortcut-changed", this.state.shortcut );
        remote.getCurrentWindow().close();
    },

    handleCancel: function() {
        remote.getCurrentWindow().close();
    },
    
    getCurrentShortcut: function() {
        return global.location.search.split("shortcut=")[1];
    }
} );

ReactDOM.render(
    React.createElement( ShortcutSetter ),
    document.getElementById( "root" ) );
