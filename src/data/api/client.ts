import Config from 'react-native-config';

import { BaseClient } from '@utils';
import { firebase } from '@services';

export class APIClient extends BaseClient {
  constructor() {
    super(Config.API_URL ?? '', {
      logCurl: __DEV__,
    });
    firebase.performance.setupForAxios(this.client);
  }
}

export const apiClient = new APIClient();
