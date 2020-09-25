const { shell } = require('electron')

exports.shurp = function shortUrlParser(shortUrl, domain = 'meet.google.com') {
    const url = 'https://'+domain+'/'+shortUrl
    return url
}

exports.linky = function handleOpenLink (url) {
    shell.openExternal(url)
}