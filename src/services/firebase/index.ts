import { getApp } from '@react-native-firebase/app';

import { AnalyticsService } from './analytics';
import { CrashlyticsService } from './crashlytics';
import { PerformanceService } from './performance';
import { CloudMessagingService } from './cloud_messaging';

class FirebaseService {
  private _analytics: AnalyticsService;
  private _messaging: CloudMessagingService;
  private _crashlytics: CrashlyticsService;
  private _performance: PerformanceService;

  public get analytics(): AnalyticsService {
    return this._analytics;
  }

  public get messaging(): CloudMessagingService {
    return this._messaging;
  }

  public get crashlytics(): CrashlyticsService {
    return this._crashlytics;
  }
  public get performance(): PerformanceService {
    return this._performance;
  }

  constructor() {
    const app = getApp();
    log.i('FirebaseService app:', app);
    this._analytics = new AnalyticsService(app);
    this._messaging = new CloudMessagingService(app);
    this._crashlytics = new CrashlyticsService();
    this._performance = new PerformanceService(app);
  }
}

export const firebase = new FirebaseService();
