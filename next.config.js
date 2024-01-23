/** @type {import('next').NextConfig} */

const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = (phase, { defaultConfig }) => {
  const isDevelopment = phase === 'development';

  return {
    ...defaultConfig,
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
      // Добавим поддержку переменных окружения с использованием dotenv-webpack
      config.plugins.push(new Dotenv({ silent: true }));

      // Переключение переменных окружения в зависимости от режима
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BACKEND_URL': JSON.stringify(
            isDevelopment
              ? process.env.NEXT_PUBLIC_BACKEND_DEV_URL
              : process.env.NEXT_PUBLIC_BACKEND_PROD_URL
          ),
          'process.env.BASE_URL': JSON.stringify(
            isDevelopment
              ? process.env.NEXT_PUBLIC_BASE_DEV_URL
              : process.env.NEXT_PUBLIC_BASE_PROD_URL
          ),
        })
      );

      // Настройка загрузчика для обработки SVG
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: { removeViewBox: false },
                    },
                  },
                ],
              },
            },
          },
        ],
      });

      // Налаштування завантажувача для обробки .ts .tsx
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              allowTsInNodeModules: true,
              transpileOnly: true,
            },
          },
        ],
      });

      return config;
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
};