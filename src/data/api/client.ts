import Config from 'react-native-config';

import BaseClient from '@/src/utils/client';

export class APIClient extends BaseClient {
  constructor() {
    super(Config.API_URL ?? '', {
      logCurl: __DEV__,
    });
  }
}

export const apiClient = new APIClient();
