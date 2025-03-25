import { Configuration, MMKV } from 'react-native-mmkv';

import { BaseCache } from './base_case';

class BaseMMKVCache implements BaseCache {
  private store: MMKV;
  private UPDATE_TIME_KEY = 'updateTime';

  constructor(config: Configuration) {
    this.store = new MMKV(config);
  }

  /**
   * Set the value for the given `key`.
   * If `value` is `undefined`, the key will be deleted.
   *
   * `value` will be serialized to JSON before storing.
   */
  set(key: string, value: unknown) {
    if (value === undefined) {
      this.store.delete(key);
    } else {
      this.store.set(key, JSON.stringify(value));
    }
    this.setUpdateTime(key, new Date().toISOString());
  }

  /**
   * Get the value (JSON type) for the given `key`, or `undefined` if it does not exist.
   */
  get(key: string) {
    const value = this.store.getString(key);
    return value ? JSON.parse(value) : undefined;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    this.store.clearAll();
  }

  containsKey(key: string) {
    return this.store.contains(key);
  }

  setUpdateTime(key: string, value: string) {
    const updateTime = this.get(this.UPDATE_TIME_KEY) || {};
    this.store.set(
      this.UPDATE_TIME_KEY,
      JSON.stringify({ ...updateTime, [key]: value }),
    );
  }

  getUpdateTime(key: string): string | undefined {
    const updateTime = this.get(this.UPDATE_TIME_KEY) || {};
    return updateTime[key] as string;
  }
}

class GlobalCache extends BaseMMKVCache {
  constructor() {
    super({ id: 'global', encryptionKey: 'GLOBAL@168268' });
  }
}

class UserCache extends BaseMMKVCache {
  constructor(userId: string) {
    super({
      id: `user.${userId}`,
      encryptionKey: `USER${userId}@168268`,
    });
  }
}

const globalCache = new GlobalCache();
let _userCache: UserCache | undefined;

const userCache = _userCache;

const createUserCache = (userId: string) => {
  _userCache = new UserCache(userId);
  return _userCache;
};

const deleteUserCache = () => {
  _userCache = undefined;
};

export { globalCache, userCache, createUserCache, deleteUserCache };
