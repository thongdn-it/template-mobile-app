declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME?: string;
    VERSION_NAME?: string;
    VERSION_CODE?: number;
    API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
