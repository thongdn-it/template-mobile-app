module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
          '@src': './src',
          '@components': './src/presentation/components',
          '@hooks': './src/presentation/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
