const { app, Menu, Tray, shell } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')

const isMac = process.platform === 'darwin'

isMac ? app.dock.hide() : null

app.on('ready', () => {
    createTray()
})


function handleOpenLink (shortUrl) {
    const url = 'https://meet.google.com/'+shortUrl

    shell.openExternal(url)
}

const createTray = () => {
    const tray = new Tray(resolve(__dirname, 'assets', 'tray-icon.png'))

    const contextMenu = Menu.buildFromTemplate([
        { 
            label: 'Banco de Dados',
            click: async () => { await handleOpenLink ('rod-icuv-cxi') },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click: async () => { await handleOpenLink ('rod-icuv-cxi') }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy('rod-icuv-cxi') }
                }
            ]
        },
        {
            label: 'TCC',
            click: async () => { await handleOpenLink ('pzz-zdpr-qpt') },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click: async () => { await handleOpenLink ('pzz-zdpr-qpt') }
                },
            ]
        }
    ])

    tray.on('click', () => {
        copy('cleiton')
    })


    tray.setToolTip('Meet Notifier')
    tray.setContextMenu(contextMenu)
}