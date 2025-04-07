const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);

// react-native-svg-transformer
const { assetExts, sourceExts } = defaultConfig.resolver;
const rnSvgTransformerConfig = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

const config = mergeConfig(defaultConfig, rnSvgTransformerConfig, {
  // other custom config
});

module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), {
  input: './global.css',
});
