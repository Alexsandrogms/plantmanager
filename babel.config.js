module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: './src',
          alias: {
            '@components': './src/components',
            '@pages': './src/pages',
            '@assets': './src/assets',
            '@services': './src/services',
            '@routes': './src/routes',
            '@utils': './src/utils',
            '@contexts': './src/contexts',
            '@enums': './src/enums',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  };
};
