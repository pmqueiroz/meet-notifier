const { app, Menu, Tray, shell } = require('electron')
const { writeSync: copy } = require('clipboardy')
const { resolve } = require('path')
const { shurp, linky } = require('./utils/functions')

const isMac = process.platform === 'darwin'

isMac ? app.dock.hide() : null

if (handleSquirrelEvent(app)) {
    return;
}

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