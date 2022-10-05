export declare type StorageValue = null | string | String | number | Number | boolean | Boolean | object;
export declare type WatchEvent = 'update' | 'remove';
export declare type WatchCallback = (event: WatchEvent, key: string) => any;
export interface StorageMeta {
    atime?: Date;
    mtime?: Date;
    [key: string]: StorageValue | Date | undefined;
}
declare type MaybePromise<T> = T | Promise<T>;
export interface Driver {
    hasItem: (key: string) => MaybePromise<boolean>;
    getItem: (key: string) => StorageValue;
    setItem?: (key: string, value: string) => MaybePromise<void>;
    removeItem?: (key: string) => MaybePromise<void>;
    getMeta?: (key: string) => MaybePromise<StorageMeta>;
    getKeys: (base?: string) => MaybePromise<string[]>;
    clear?: () => MaybePromise<void>;
    dispose?: () => MaybePromise<void>;
    watch?: (callback: WatchCallback) => MaybePromise<void>;
}
export interface Storage {
    hasItem: (key: string) => Promise<boolean>;
    getItem: (key: string) => Promise<StorageValue>;
    setItem: (key: string, value: StorageValue) => Promise<void>;
    removeItem: (key: string, removeMeta?: boolean) => Promise<void>;
    getMeta: (key: string, nativeMetaOnly?: true) => MaybePromise<StorageMeta>;
    setMeta: (key: string, value: StorageMeta) => Promise<void>;
    removeMeta: (key: string) => Promise<void>;
    getKeys: (base?: string) => Promise<string[]>;
    clear: (base?: string) => Promise<void>;
    dispose: () => Promise<void>;
    watch: (callback: WatchCallback) => Promise<void>;
    mount: (base: string, driver: Driver) => Storage;
    unmount: (base: string, dispose?: boolean) => Promise<void>;
}
export {};
