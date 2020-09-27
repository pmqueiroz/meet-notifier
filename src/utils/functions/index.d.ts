/**
Parse url queries to a complete url

@param shortUrl - querie to be appended to url
@param domain - optionally, different url domain

@example
```
import { shurp } from 'functions'

shurp('123-abc-xyz')
//=> 'https://meet.google.com/123-abc-xyz'
```
*/
export function shurp(shortUrl: string, domain?: string): string

/**
Return a path string of a image with density

@param fileName - name of the file
@param density - number of the image density
@param dirPath - optionally, different image dir path

@example
```
import { imge } from 'functions'

imge('tray-icon', 4)
//=> 'C:\Documentos\Projects\cleiton\src\assets\tray-icon@4x.png'
```
*/
export function imge(fileName: string, density: number, dirPath?: string): string

/**
Open a external link on deafault browser

@param url - external link

@example
```
import { linky } from 'functions'

linky('github.com/pmqueiroz/meet-notifier')
```
*/
export function linky(url: string): void
