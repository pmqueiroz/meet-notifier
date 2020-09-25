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
