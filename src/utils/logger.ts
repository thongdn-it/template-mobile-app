type Logger = {
  e(message?: any, ...optionalParams: any[]): void;
  i(message?: any, ...optionalParams: any[]): void;
  l(message?: any, ...optionalParams: any[]): void;
  w(message?: any, ...optionalParams: any[]): void;
  t(message?: any, ...optionalParams: any[]): void;
  d(message?: any, ...optionalParams: any[]): void;

  table(...data: any[]): void;
  groupCollapsed(label?: string): void;
  groupEnd(): void;
  group(label?: string): void;
};

declare global {
  var log: Logger;
}

globalThis.log = __DEV__
  ? {
      e: (message?: any, ...optionalParams: any[]) =>
        console.error('TDN', message, ...optionalParams),
      i: (message?: any, ...optionalParams: any[]) =>
        console.info('TDN', message, ...optionalParams),
      l: (message?: any, ...optionalParams: any[]) =>
        console.log('TDN', message, ...optionalParams),
      w: (message?: any, ...optionalParams: any[]) =>
        console.warn('TDN', message, ...optionalParams),
      t: (message?: any, ...optionalParams: any[]) =>
        console.trace('TDN', message, ...optionalParams),
      d: (message?: any, ...optionalParams: any[]) =>
        console.debug('TDN', message, ...optionalParams),

      table: console.table,
      group: console.group,
      groupCollapsed: console.groupCollapsed,
      groupEnd: console.groupEnd,
    }
  : {
      e: () => {},
      i: () => {},
      l: () => {},
      w: () => {},
      t: () => {},
      d: () => {},

      table: () => {},
      group: () => {},
      groupCollapsed: () => {},
      groupEnd: () => {},
    };

export {};
