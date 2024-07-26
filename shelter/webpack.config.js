const path = require('path') // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development', // Режим сборки
    entry: './src/js/index.js', // Точка входа для сборки проекта

    output: {
      path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
      filename: '[name].[contenthash].js', // Имя выходного файла сборки
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
          use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
        },
        {
          test: /\.(jpg|png|svg|jpeg|gif)$/, // изображения
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'), // Каталог для статики
      },
      open: true, // Автоматически открывать браузер
    },
  }
}
