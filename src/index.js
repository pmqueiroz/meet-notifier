const { app, Menu, Tray, shell } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')
const { shurp, linky } = require('./utils/functions')

const isMac = process.platform === 'darwin'

isMac ? app.dock.hide() : null

app.on('ready', () => {
    createTray()
})

const createTray = () => {
    const tray = new Tray(resolve(__dirname, 'assets', 'tray-icon.png'))

    const contextMenu = Menu.buildFromTemplate([
        { 
            label: 'Banco de Dados',
            click: async () => { await linky(shurp('rod-icuv-cxi')) },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click: async () => { await linky(shurp('rod-icuv-cxi')) }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy('rod-icuv-cxi') }
                }
            ]
        },
        {
            label: 'TCC',
            click: async () => { await linky(shurp('pzz-zdpr-qpt')) },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click: async () => { await linky(shurp('pzz-zdpr-qpt')) }
                },
            ]
        }
    ])

    tray.setToolTip('Meet Notifier')
    tray.setContextMenu(contextMenu)
}