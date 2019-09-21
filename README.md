# This tool is abandonned! Windows 10 now has a native emoji keyboard, just press <kbd>⊞ Windows</kbd>+<kbd>;</kbd>

# Emojis Everywhere
Do you like emojis? :thumbsup:

This tool allows you to invoke an emoji picker from any app, by pressing a keyboard shortcut.

![screenshot of the app](https://raw.githubusercontent.com/thomaslule/emojis-everywhere/master/assets/screenshot.png)

**[Download it here.](https://github.com/thomaslule/emojis-everywhere/raw/master/dist/Emojis%20Everywhere%20Setup%201.0.1.exe)**

## Technical things

I made this app by throwing some nice libraries together then watching the magic happen:

* [emojione-picker](https://github.com/tommoor/emojione-picker) by Tom Moor
* [Electron](https://electron.atom.io/) by GitHub
* [electron-builder](https://github.com/electron-userland/electron-builder) by Electron's community
* [React](https://facebook.github.io/react/) by Facebook

To build the app yourself you can clone this repository then:

````bash
yarn install # install the dependencies
yarn start # launch the app in dev mode
yarn test # launch unit tests
yarn build # build the installer
````
    
You can also use npm but it isn't recommanded for the `build` command.
