export * from './mmkv_cache';

export enum GlobalCacheKeys {
  IS_FIRST_TIME = 'isFirstTime',
  LOGGED_IN_USER_ID = 'loggedInUserId',
}

export enum UserCacheKeys {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}
