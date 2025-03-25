import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { format } from 'date-fns';
import {
  FirebasePerformanceTypes,
  getPerformance,
} from '@react-native-firebase/perf';
import { enUS } from 'date-fns/locale';
import { ReactNativeFirebase } from '@react-native-firebase/app';

type PerformanceHttpMethod =
  | 'GET'
  | 'HEAD'
  | 'PUT'
  | 'POST'
  | 'PATCH'
  | 'DELETE';

export class PerformanceService {
  private _traces: {
    [key: string]:
      | FirebasePerformanceTypes.Trace
      | FirebasePerformanceTypes.HttpMetric;
  } = {};

  private _perf: FirebasePerformanceTypes.Module;

  constructor(app?: ReactNativeFirebase.FirebaseApp) {
    this._perf = getPerformance(app);
  }

  async setupForAxios(axios: AxiosInstance) {
    axios.interceptors.request.use(async config => {
      this.startHttpMetric(config);
      return config;
    });

    axios.interceptors.response.use(
      async response => {
        this.stopHttpMetric(response.config, { response });
        return response;
      },
      async error => {
        this.stopHttpMetric(error.config, { error });
        return error;
      },
    );
  }

  getTraceIdentifier(url: string, method: PerformanceHttpMethod) {
    return `Http: [${method}] ${url}`;
  }

  newTrace(identifier: string) {
    if (!this._traces[identifier]) {
      this._traces[identifier] = this._perf.newTrace(identifier);
    }
    return this._traces[identifier];
  }

  async startTrace(identifier: string, attributes?: { [key: string]: string }) {
    if (!this._traces[identifier]) {
      this._traces[identifier] = this._perf.newTrace(identifier);
    }
    if (attributes) {
      for (const key in attributes) {
        this._traces[identifier].putAttribute(key, attributes[key]);
      }
    }
    await this._traces[identifier].start();
    return this._traces[identifier];
  }

  async stopTrace(identifier: string, attributes?: { [key: string]: string }) {
    const trace = this._traces[identifier];
    if (trace) {
      if (attributes) {
        for (const key in attributes) {
          trace.putAttribute(key, attributes[key]);
        }
      }
      await trace.stop();
      return delete this._traces[identifier];
    }
  }

  // - Http Metric - //
  startHttpMetric(config: InternalAxiosRequestConfig) {
    if (config.url) {
      const method =
        (config.method?.toUpperCase() as PerformanceHttpMethod) ?? 'GET';
      const fullPath = `${config.baseURL}${config.url}`;
      const identifier = this.getTraceIdentifier(fullPath, method);
      if (!this._traces[identifier]) {
        this._traces[identifier] = this._perf.newHttpMetric(fullPath, method);
      }
      return this.startTrace(identifier);
    }
    return null;
  }

  async stopHttpMetric(
    config: InternalAxiosRequestConfig,
    data?: {
      response?: AxiosResponse;
      error?: unknown;
    },
  ) {
    if (config.url) {
      const method =
        (config.method?.toUpperCase() as PerformanceHttpMethod) ?? 'GET';
      const fullPath = `${config.baseURL}${config.url}`;
      const identifier = this.getTraceIdentifier(fullPath, method);
      const trace = this._traces[identifier];
      try {
        if (trace as FirebasePerformanceTypes.HttpMetric) {
          const metric = trace as FirebasePerformanceTypes.HttpMetric;
          metric.setHttpResponseCode(data?.response?.status ?? 0);
          metric.setResponseContentType(
            data?.response?.headers['content-type'] ?? null,
          );
          metric.setRequestPayloadSize(config.data?.length ?? 0);
          metric.setResponsePayloadSize(data?.response?.data?.length ?? 0);
        }

        const attributes: {
          [key: string]: string;
        } = {};
        if (data?.response) {
          attributes.status = data.response.status.toString();
          attributes.success = `${data.response.data.success}`;
        }
        if (data?.error) {
          attributes.error = JSON.stringify(data.error).substring(0, 99);
        }
        this.stopTrace(identifier, attributes);
      } catch (error) {
        log.e('ThongDN - stopHttpMetric error:', error);
      }
    }
  }

  // - Screen Trace - //
  startScreenTrace(screenName: string, attributes?: { [key: string]: string }) {
    const identifier = `screen_render_trace_${screenName}`;
    const now = Date.now();
    return this.startTrace(identifier, {
      screen: screenName,
      open_day_of_week: format(now, 'EEEE', { locale: enUS }),
      open_day: format(now, 'yyyy-MM-dd', { locale: enUS }),
      ...attributes,
    });
  }

  stopScreenTrace(screenName: string, attributes?: { [key: string]: string }) {
    const identifier = `screen_render_trace_${screenName}`;
    this.stopTrace(identifier, {
      ...attributes,
    });
  }
}
