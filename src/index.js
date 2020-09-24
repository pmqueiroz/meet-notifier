const { app, Menu, Tray } = require('electron')
const { resolve } = require('path')

app.on('ready', () => {
    const tray = new Tray(resolve(__dirname, 'assets', 'tray-icon.png'))

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio', checked: true }
    ])

    tray.setContextMenu(contextMenu)
})