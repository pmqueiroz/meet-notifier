const { shell } = require('electron')
const { resolve } = require ('path')

exports.shurp = function shortUrlParser(shortUrl, domain = 'meet.google.com') {
   const url = 'https://'+domain+'/'+shortUrl
   return url
}

exports.linky = function handleOpenLink (url) {
   if(url.includes('https://')) {
      shell.openExternal(url)
   } else {
      shell.openExternal(`https://${url}`)
   }
}

exports.imge = function getImageByDensity (fileName, density, dirPath = './src/assets') {
   const file = fileName.split('.')

   !file[1] ? file[1] = '.png' : file[1] = '.'+file[1]

   let path

   if (density === 1) {
      path = resolve(dirPath, file.join(''))
   } else {
      path = resolve(dirPath, file[0])+'@'+density+'x'+file[1]
   }

   return path
}
