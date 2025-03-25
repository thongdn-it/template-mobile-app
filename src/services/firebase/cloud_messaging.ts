import {
  FirebaseMessagingTypes,
  getMessaging,
} from '@react-native-firebase/messaging';
import { requestNotifications } from 'react-native-permissions';
import { ReactNativeFirebase } from '@react-native-firebase/app';

export class CloudMessagingService {
  private _messing;
  private _onMessage?: (
    message: FirebaseMessagingTypes.RemoteMessage,
    isBackground?: boolean,
  ) => void;

  constructor(app?: ReactNativeFirebase.FirebaseApp) {
    this._messing = getMessaging(app);
  }

  requestPermission = async () => {
    requestNotifications(['sound', 'alert', 'badge']).then(
      ({ status, settings }) => {
        log.i('requestNotifications status:', status, '-settings:', settings);
        if (status === 'granted') {
          this._messing.getToken().then(token => {
            log.i('getToken:', token);
          });
          this.setupHandleNotification();
        }
      },
    );
  };

  setOnMessage = (
    onMessage:
      | ((
          message: FirebaseMessagingTypes.RemoteMessage,
          isBackground?: boolean,
        ) => void)
      | undefined,
  ) => {
    this._onMessage = onMessage;
  };

  getToken = async () => {
    return this._messing.getToken();
  };

  deleteToken = async () => {
    return this._messing.deleteToken();
  };

  getInitialNotification = () => {
    return this._messing.getInitialNotification();
  };

  onNotificationOpenedApp = (
    listener: (message: FirebaseMessagingTypes.RemoteMessage) => any,
  ) => {
    return this._messing.onNotificationOpenedApp(listener);
  };

  setupHandleNotification = async () => {
    this._messing.onMessage(async message => {
      this._onMessage?.(message, false);
    });
    this._messing.setBackgroundMessageHandler(async message => {
      this._onMessage?.(message, true);
    });
  };
}
