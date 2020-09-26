require('events').EventEmitter.defaultMaxListeners = 15;
const { app, screen, Menu, Tray, Notification, BrowserWindow } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')
const { shurp, linky, imge } = require('./utils/functions')

const isMac = process.platform === 'darwin'
const meetIcon = resolve(__dirname, 'assets', 'tray-icon.png')
let tray = null
let isHidden = false

isMac ? app.dock.hide() : null

app.setAppUserModelId(process.execPath)

app.on('ready', () => {
    createTray()
})

const notify = (title, body) => {
    let icon = imge('tray-icon', 4)
    new Notification({
        title, 
        body,
        icon
    }).show();
}

const createTray = () => {
    tray = new Tray(meetIcon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Meet Notifier' },
        { type: 'separator' },
        //Item
        { 
            label: 'Banco de Dados',
            click: async () => { await linky(shurp('rod-icuv-cxi')) },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click () { openMeet('rod-icuv-cxi') }
                },
                { 
                    label: 'Abrir no Navegador',
                    click () { linky(shurp('rod-icuv-cxi')) }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy(shurp('rod-icuv-cxi')) }
                },
            ]
        },
        //Item
        {
            label: 'TCC',
            click: async () => { await linky(shurp('pzz-zdpr-qpt')) },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click () { openMeet('pzz-zdpr-qpt') }
                },
                { 
                    label: 'Abrir no Navegador',
                    click () { linky(shurp('pzz-zdpr-qpt')) }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy(shurp('pzz-zdpr-qpt')) }
                },
            ]
        },
        { type: 'separator' },
        { label: 'Sair', click: () => {app.quit()} },
        { label: 'aaaaa', click: () => {console.log(hidden())} },
    ])

    tray.setToolTip('Meet Notifier')
    tray.setContextMenu(contextMenu)

  
    tray.on('double-click', () => notify('Banco de Dados', 'Próxima reunião em 20 minutos'))

    tray.on('click' , () => tray.popUpContextMenu())
}

const openMeet = (code) => {
    isHidden = false
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
	win = new BrowserWindow({
		width: width * .7,
		height:  height * .7,
        icon: imge('tray-icon', 4),
    })

    win.on('close', function (event) {
        if (!isHidden) {
            event.preventDefault()
        }
        win.hide()
    });

    win.on('hide', () => {
        isHidden = true
    })
    
    win.loadURL('https://meet.google.com/'+code)

	win.on('closed', (e) => {
		win = null
    })

    
    Menu.setApplicationMenu(null)
}