const { app, screen, Menu, Tray, Notification, BrowserWindow } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')
const { shurp, linky, imge } = require('./utils/functions')

const isMac = process.platform === 'darwin'
const meetIcon = resolve(__dirname, 'assets', 'tray-icon.png')
let tray = null
let hidden = true;

isMac ? app.dock.hide() : null

if (handleSquirrelEvent(app)) {
    return;
}

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

const onClose = (exitCode = 1) => {
    console.log('switch')
    switch (exitCode) {
        case 0:
            win.hide()
            hidden = true
            console.log('hide')
            break;
        case 1:
            app.quit()
            console.log('quit')
            break;
        default:
            console.log('default')
            app.quit()
            break;
    }
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
    ])

    tray.setToolTip('Meet Notifier')
    tray.setContextMenu(contextMenu)

  
    tray.on('double-click', () => notify('Banco de Dados', 'Próxima reunião em 20 minutos'))

    tray.on('click' , () => tray.popUpContextMenu())
}

const openMeet = (code) => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
	win = new BrowserWindow({
		width: width * .7,
		height:  height * .7,
        icon: imge('tray-icon', 4),
    })

    hidden = false

    win.on('close', function (event) {
        !hidden ? event.preventDefault() : null
        onClose(0)
    });
    
    win.loadURL('https://meet.google.com/'+code)

	win.on('closed', (e) => {
		win = null
    })

    
    Menu.setApplicationMenu(null)
}

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};