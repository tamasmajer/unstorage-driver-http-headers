import { defineDriver } from './utils/index.js';
import { stringify } from './utils/index.js';
import { $fetch } from 'ohmyfetch';
import { joinURL } from 'ufo';
export default defineDriver((opts = {}) => {
    const r = (key) => joinURL(opts.base, key.replace(/:/g, "/"));
    const { headers } = opts;
    return {
        hasItem(key) {
            return $fetch(r(key), { method: "HEAD", headers }).then(() => true).catch(() => false);
        },
        async getItem(key) {
            const value = await $fetch(r(key), { method: "GET", headers });
            return value;
        },
        async getMeta(key) {
            try {
                const res = await $fetch.raw(r(key), { method: "HEAD", headers });
                const _lastModified = res.headers.get("last-modified");
                let mtime = _lastModified ? new Date(_lastModified) : undefined;
                return { status: 200, mtime };
            }
            catch (e) {
                return { status: 404 };
            }
        },
        async setItem(key, value) {
            await $fetch(r(key), { method: "PUT", headers, body: stringify(value) });
        },
        async removeItem(key) {
            await $fetch(r(key), { method: "DELETE", headers });
        },
        async getKeys() {
            const value = await $fetch(r(""), { method: "GET", headers });
            return Array.isArray(value) ? value : [];
        },
        clear() {
        }
    };
});
