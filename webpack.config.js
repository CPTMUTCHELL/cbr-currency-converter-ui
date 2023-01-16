const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer: {
        historyApiFallback: true,

        compress: true,
        port: 3000,
        proxy: {
            '/backend/auth/*': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            },
            '/backend/convert/*': {
                target: 'http://localhost:8082',
                changeOrigin: true,
            },
            '/backend/history/*': {
                target: 'http://localhost:8083',
                changeOrigin: true,
            },

        },

    },
    entry: './src/index.tsx',
    target: "web",
    output: {
        publicPath: "/public",
        filename: "bundle.js",
        path: path.join(__dirname,'/build')
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"})
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src/")

        },
        modules: [
            path.resolve('.'),
            'node_modules'
        ],
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                   "ts-loader"
                ]

            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']

            },
            {
                test: /\.(pdf|jpg|png|svg|gif|jpeg)$/,
                type: "asset/resource",
            },

        ]
    }
}