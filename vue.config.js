const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  pwa: {
    name: 'Conference App',
    themeColor: '#2196f3',
    msTileColor: '#2196f3',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'icons/android/icon_32x32.png',
      favicon16: 'icons/android/icon_32x32.png',
      appleTouchIcon: 'icons/ios/icon_152x152.png',
      maskIcon: '',
      msTileImage: 'icons/android/icon_144x144.png',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
      exclude: [/data\/*/]
    }
  },
  configureWebpack: {
    plugins: [
      // new WebpackPwaManifest({
      //     name: 'Conference App',
      //     short_name: 'vcapp',
      //     description: 'Der Session Planer für die Konferenz der Wahl',
      //     background_color: '#2196f3',
      //     theme_color: '#2196f3',
      //     inject: true,
      //     fingerprints: false,
      //     ios: {
      //         'apple-mobile-web-app-title': 'Conference Sessions',
      //         'apple-mobile-web-app-status-bar-style': 'black-translucent'
      //     },
      //     icons: [
      //         {
      //             src: path.resolve('src/assets/logo.png'),
      //             sizes: [120, 152, 167, 180, 1024],
      //             destination: path.join('icons', 'ios'),
      //             ios: true
      //         },
      //         {
      //             src: path.resolve('src/assets/logo.png'),
      //             size: 1024,
      //             destination: path.join('icons', 'ios'),
      //             ios: 'startup'
      //           },
      //           {
      //             src: path.resolve('src/assets/logo.png'),
      //             sizes: [32, 48, 36, 48, 72, 96, 144, 192, 512],
      //             destination: path.join('icons', 'android')
      //           }
      //     ]
      // }),
    ],
  },
};
