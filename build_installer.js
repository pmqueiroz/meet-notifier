const { MSICreator } = require('electron-wix-msi')

const path = require('path')

const APP_DIR = path.resolve(__dirname, './dist/MeetNotifier-win32-x64')

const OUT_DIR = path.resolve(__dirname, './dist/windows')


const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: 'A Google Meet notifier for meets schedules in calendar.google',
    exe: 'MeetNotifier',
    name: 'Meet Notifier',
    manufacturer: 'pmqueiroz',
    version: '0.0.1',

    ui: {
        chooseDirectory: true
    },
})

msiCreator.create().then(function(){
    msiCreator.compile()
})