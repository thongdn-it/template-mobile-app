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
      e: console.error,
      i: console.info,
      l: console.log,
      w: console.warn,
      t: console.trace,
      d: console.debug,

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
