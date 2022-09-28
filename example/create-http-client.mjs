import { createStorage } from 'unstorage'
import createDriver from '../src/drivers/http-headers.mjs'

/**
 * Creates a client to a remote storage.
 * 
 * @example
 * const client = createHttpClient("http://server.name/prefix", {"session-id":"123"})
 * await client.setItem("key","value")
 * const value = await client.getItem("key")
 * const exists = await client.hasItem("key")
 * const keys = await client.getKeys()
 * await client.removeItem("key")
 * 
 * @param {string} url: url base path for the remote http server
 * @param {object} headers: fix headers to inject (authentication, session ID, or others) 
 * @see {@link https://github.com/unjs/unstorage#storage-interface}
 * @returns 
 */

export default function createHttpClient(url, headers) {
    const driver = createDriver({ base: url, headers })
    const client = createStorage({ driver })
    return client
}
