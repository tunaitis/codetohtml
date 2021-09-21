const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const config = {
    entry: {
        index: path.resolve(__dirname, 'src/assets/scripts/index.ts'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.hbs$/, use: 'handlebars-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist', 'assets'),
        publicPath: '/assets/'
    },
    plugins: [
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        /*
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(__dirname, 'src', 'templates', 'index.hbs'),
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'changelog.html',
            inject: 'body',
            template: path.resolve(__dirname, 'src', 'templates', 'changelog.hbs'),
            chunks: ['changelog'],
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            inject: 'body',
            template: path.resolve(__dirname, 'src', 'templates', 'contact.hbs'),
            chunks: ['contact'],
        }),*/
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        /*
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),*/
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }
    if (argv.mode === 'production') {
        config.mode = 'production';
        config.plugins.push(new PurgeCSSWebpackPlugin({
            paths: glob.sync(['src/**/*.njk', 'src/**/*.ts'], { noDir: true }),
            safelist: {
                standard: ['modal-backdrop'],
            },
        }));
    }

    return config;
};