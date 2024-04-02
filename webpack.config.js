const path = require('path')

// # TODO
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "public")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: true,
        port: 9000
    },
    mode: "development"
}