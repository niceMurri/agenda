const path = require('path');


module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname,'frontend','main.js'),
    output: {
        path: path.resolve('public','assets','js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: 'source-map'
}