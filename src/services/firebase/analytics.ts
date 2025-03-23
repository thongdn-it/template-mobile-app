import DeviceInfo from 'react-native-device-info';
import { default as RNAnalytics } from '@react-native-firebase/analytics';

class AnalyticsService {
  private _analytics = RNAnalytics();
  private _userProperties: { [key: string]: string | null } = {};

  constructor() {
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();
    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();
    const isLowRamDevice = DeviceInfo.isLowRamDevice();
    const deviceName = DeviceInfo.getDeviceNameSync();

    this._analytics.setUserProperties({
      app_version: `${appVersion}_${buildNumber}`,
      device_os: `${systemName}_${systemVersion}`,
      device_name: `${deviceName}`,
      device_is_low_ram: `${isLowRamDevice}`,
    });
  }

  logEvent(event: string, params?: { [key: string]: any }) {
    const _params: { [key: string]: any } = {};
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined) {
          _params[key.substring(0, 39)] = `${params[key]}`.substring(0, 99);
        }
      });
    }

    log.d('Analytics:', event, _params);
    this._analytics.logEvent(event.substring(0, 39), _params);
  }

  setUserId(userId: string | null) {
    this._analytics.setUserId(userId);
  }

  setUserProperties(properties: { [key: string]: string | null }) {
    this._userProperties = { ...this._userProperties, ...properties };
    this._analytics.setUserProperties(properties);
  }

  deleteUserProperties() {
    Object.keys(this._userProperties).forEach(key => {
      this._analytics.setUserProperties({ [key]: null });
    });
    this._userProperties = {};
  }

  logScreenView(screenName: string, screenClass?: string) {
    this._analytics.logScreenView({
      screen_name: screenName,
      screen_class: screenClass ?? screenName,
    });
  }
}

export const analytics = new AnalyticsService();
