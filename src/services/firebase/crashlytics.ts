import {
  FirebaseCrashlyticsTypes,
  getCrashlytics,
} from '@react-native-firebase/crashlytics';

export class CrashlyticsService {
  private _crashlytics: FirebaseCrashlyticsTypes.Module;

  constructor() {
    this._crashlytics = getCrashlytics();
  }

  setUserId(userId: string) {
    this._crashlytics.setUserId(userId);
  }

  setAttributes(properties: { [key: string]: string }) {
    this._crashlytics.setAttributes(properties);
  }
}
