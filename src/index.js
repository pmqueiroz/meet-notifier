const { app, Menu, Tray, Notification } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')
const { shurp, linky, imge } = require('./utils/functions')

const isMac = process.platform === 'darwin'
const meetIcon = resolve(__dirname, 'assets', 'tray-icon.png')
let tray = null

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
                    click: async () => { await linky(shurp('rod-icuv-cxi')) }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy('rod-icuv-cxi') }
                }
            ]
        },
        //Item
        {
            label: 'TCC',
            click: async () => { await linky(shurp('pzz-zdpr-qpt')) },
            submenu: [
                { 
                    label: 'Abrir Meet',
                    click: async () => { await linky(shurp('pzz-zdpr-qpt')) }
                },
                { 
                    label: 'Copiar Link',
                    click() { copy('pzz-zdpr-qpt') }
                },
            ]
        },
        { type: 'separator' },
        isMac ? { label: 'Sair', role: 'close' } : { label: 'Sair', role: 'quit' },
    ])

    tray.setToolTip('Meet Notifier')
    tray.setContextMenu(contextMenu)

  
    tray.on('double-click', () => notify('Banco de Dados', 'Próxima reunião em 20 minutos'))
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