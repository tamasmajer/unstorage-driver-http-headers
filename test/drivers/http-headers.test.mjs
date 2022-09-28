import { describe, it, expect } from 'vitest'
import { createStorage } from 'unstorage'
import {snapshot} from 'unstorage'
import { createStorageServer } from 'unstorage/server'
import { listen } from 'listhen'

import createHttpDriver from '../../src/drivers/http-headers.mjs'

describe('drivers: unstorage-http-driver-with-headers', () => {
  it('basic', async () => {
    
    // create server
    
    const memoryStorage = createStorage()
    const server = createStorageServer(memoryStorage)
    const { url, close } = await listen(server.handle, {
      port: { random: true }
    })

    // create client

    const headers = { 'session-id': '1' }
    const httpDriverWithHeaders = createHttpDriver({ base: url, headers })
    const httpClient = createStorage({ driver: httpDriverWithHeaders })

    // test client

    expect(await httpClient.hasItem('bucket:key')).toBe(false)

    await httpClient.setItem('bucket:key', 'value')
    expect(await httpClient.getItem('bucket:key')).toBe('value')
    expect(await httpClient.hasItem('bucket:key')).toBe(true)

    const snap = await snapshot(httpClient,'bucket')

    const date = new Date()
    await httpClient.setMeta('bucket:key', { mtime: date })

    const meta = await httpClient.getMeta('bucket:key')
    expect(meta).toMatchObject({ mtime: date, status: 200 })

    await close()
  })
})
