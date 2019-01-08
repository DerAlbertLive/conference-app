const path = require("path");
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    configureWebpack: {
        plugins: [
            new WebpackPwaManifest({
                name: 'dotnet Cologne 2018',
                short_name: 'dncng 2018',
                description: 'dotnet Cologne 2018',
                background_color: '#2196f3',
                theme_color: '#2196f3',
                inject: true,
                ios: {
                    'apple-mobile-web-app-title': 'dotnet Cologne 2018',
                    'apple-mobile-web-app-status-bar-style': 'black-translucent'
                },
                icons: [
                    {
                        src: path.resolve('src/assets/logo.png'),
                        sizes: [120, 152, 167, 180, 1024],
                        destination: path.join('icons', 'ios'),
                        ios: true
                    },
                    {
                        src: path.resolve('src/assets/logo.png'),
                        size: 1024,
                        destination: path.join('icons', 'ios'),
                        ios: 'startup'
                      },
                      {
                        src: path.resolve('src/assets/logo.png'),
                        sizes: [36, 48, 72, 96, 144, 192, 512],
                        destination: path.join('icons', 'android')
                      }
                ]
            }),
        ]
      }
  }