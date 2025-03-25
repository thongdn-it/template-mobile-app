export interface BaseCache {
  /**
   * Get the value for the given `key`, or `undefined` if it does not exist.
   */
  get(key: string): any;

  /**
   * Set the value for the given `key`.
   */
  set(key: string, value: any): void;

  /**
   * Check if the cache contains the given `key`.
   */
  containsKey(key: string): boolean;

  /**
   * Delete the given `key`.
   */
  delete(key: string): void;

  /**
   * Clear all entries in the cache.
   */
  clear(): void;

  setUpdateTime(key: string, value: string): void;

  getUpdateTime(key: string): string | undefined;
}
