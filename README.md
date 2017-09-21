# Webpack для SPA сайта :<br />
1. динамическая подгрузка js файлов при **РОУТИНГЕ.**
2. scripts в package.json:<br />
    2.1. "wbk-dev-s": "set NODE_ENV=development&set NODE_ARCH=1&set NODE_WATCH=0&webpack&node server.js",<br />
    2.2. "wbk-dev-wat": "set NODE_ENV=development&set NODE_ARCH=1&set NODE_WATCH=1&webpack",<br />
    2.3. "wbk-pro": "set NODE_ENV=development&set NODE_ARCH=0&set NODE_WATCH=0&webpack&node server.js",<br />
    2.4. "wbk-pro2": "set NODE_ENV=production&set NODE_ARCH=0&set NODE_WATCH=0&webpack&node server.js"<br />
3. filename: "[name][hash].js" - hesh в названиях файлов, в том числе динамических!!!
4. История версий в файле ver.js - http://127.0.0.1:3000/ver

Плагины:
1. NoErrorsPlugin – не добавляет в сборку файлы с ошибками
2. rimraf - удаляет старые js файлы из папки
3. assetsPlugin - СОЗДАЕТ ФАЙЛ assets.json С ИНФОРМАЦИЕЙ О СБОРКЕ (hesh)
4. HtmlWebpackPlugin - создает index.html файл с подключенным внутри и обновленным app.[hash].js 

**require.context - позволяет динамически подсасывать .js файлы**

npm i :Импортировать необходимые модули.Зависимости указаны в файле package.json

http://127.0.0.1:3000/ver