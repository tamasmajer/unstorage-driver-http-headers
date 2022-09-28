# unstorage-driver-http-headers

This is a simple extension of the default [http driver](https://github.com/unjs/unstorage/blob/main/src/drivers/http.ts) for [Unstorage](https://github.com/unjs/unstorage). [Here](https://github.com/unjs/unstorage#http-universal) are the docs.

It allows to add extra headers to the http requests, like an access token or a session ID.



## Install

``` bash
npm install unstorage
npm install unstorage-driver-http-headers
```

## Example

``` js
import { createStorage } from 'unstorage'
import createDriver from 'unstorage-driver-http-headers'

const SAMPLE_URL = 'https://my-unstorage-server-needs-credentials.com/api'
const SAMPLE_HEADERS = { 'credentials': 'my-credentials' }

const driver = createDriver({ base: SAMPLE_URL, headers: SAMPLE_HEADERS })
const storage = createStorage({ driver })

const testing = async () => {
    await storage.setItem("key","value")
    const value = await storage.getItem("key")
    const exists = await storage.hasItem("key")
    const keys = await storage.getKeys()
    await storage.removeItem("key")
    console.log({value, exists, keys})
}
testing()
```





