import {
   app,
   screen,
   shell,
   Menu,
   Tray,
   Notification,
   BrowserWindow,
   nativeImage,
} from 'electron'
import { EventEmitter } from 'events'
import { writeSync as copy } from 'clipboardy'

EventEmitter.defaultMaxListeners = 15

const linky = (url: string) => {
   if (url.includes('https://')) {
      shell.openExternal(url)
   } else {
      shell.openExternal(`https://${url}`)
   }
}

const shurp = (shortUrl: string, domain = 'meet.google.com') => {
   const url = 'https://' + domain + '/' + shortUrl
   return url
}

const isMac = process.platform === 'darwin'
let isHidden = false
let tray: Tray | null
let win: BrowserWindow | null

isMac ? app.dock.hide() : null

app.setAppUserModelId(process.execPath)

const icon = nativeImage.createFromPath(
   `${app.getAppPath()}/src/assets/logo.ico`,
)

const icon_alpha = nativeImage.createFromPath(
   `${app.getAppPath()}/src/assets/tray-icon.png`,
)

const notify = (title: string, body: string) => {
   new Notification({
      title,
      body,
      icon,
   }).show()
}

const openMeet = (code: string) => {
   isHidden = false
   const { width, height } = screen.getPrimaryDisplay().workAreaSize
   win = new BrowserWindow({
      width: width * 0.7,
      height: height * 0.7,
      icon,
   })

   win.on('close', function (event) {
      if (!isHidden) {
         event.preventDefault()
      }
      win?.hide()
   })

   win.on('hide', () => {
      isHidden = true
   })

   win.loadURL('https://meet.google.com/' + code)

   win.on('closed', () => {
      win = null
   })

   Menu.setApplicationMenu(null)
}

const createTray = () => {
   tray = new Tray(icon)

   const contextMenu = Menu.buildFromTemplate([
      {
         label: 'Meet Notifier',
         icon: icon_alpha,
         enabled: false,
      },
      { type: 'separator' },
      //Item
      {
         label: 'Banco de Dados',
         click: async () => {
            await linky(shurp('rod-icuv-cxi'))
         },
         submenu: [
            {
               label: 'Open Meet',
               click() {
                  openMeet('rod-icuv-cxi')
               },
            },
            {
               label: 'Open on Browser',
               click() {
                  linky(shurp('rod-icuv-cxi'))
               },
            },
            {
               label: 'Copy Link',
               click() {
                  copy(shurp('rod-icuv-cxi'))
               },
            },
         ],
      },
      //Item
      {
         label: 'TCC',
         click: async () => {
            await linky(shurp('pzz-zdpr-qpt'))
         },
         submenu: [
            {
               label: 'Abrir Meet',
               click() {
                  openMeet('pzz-zdpr-qpt')
               },
            },
            {
               label: 'Abrir no Navegador',
               click() {
                  linky(shurp('pzz-zdpr-qpt'))
               },
            },
            {
               label: 'Copiar Link',
               click() {
                  copy(shurp('pzz-zdpr-qpt'))
               },
            },
         ],
      },
      { type: 'separator' },
      {
         label: 'Help',
         submenu: [
            {
               label: 'Learn more',
               click() {
                  linky('github.com/pmqueiroz/meet-notifier')
               },
            },
            {
               label: 'Report Issue',
               click() {
                  linky('github.com/pmqueiroz/meet-notifier/issues')
               },
            },
         ],
      },
      isMac ? { role: 'close' } : { role: 'quit' },
   ])

   tray.setToolTip('Meet Notifier')
   tray.setContextMenu(contextMenu)

   tray.on('double-click', () =>
      notify('Banco de Dados', 'Próxima reunião em 20 minutos'),
   )

   tray.on('click', () => tray?.popUpContextMenu())
}

app.on('ready', () => {
   createTray()
})
