const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtratcPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production';

    return {
            entry: ['babel-polyfill', './src/js/index.js'],
            output: {
                filename: devMode ? 'bundle.js' : 'bundle.[hash].js',
                path: path.resolve(__dirname, 'public'),
                chunkFilename: devMode ? '[id].js' : 'chunk.[id].[hash].js',
                publicPath: '/'
            },
            module: {
                rules: [
                    {
                        test:/\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    },
                    {
                        test: /\.s?css$/,
                        use: [
                            {
                                loader: MiniCssExtratcPlugin.loader,
                                options: {
                                    hmr: devMode
                                }
                            }, 
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    plugins: [
                                        autoprefixer()
                                    ],
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                            
                        ]

                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2)$/,
                        loader: 'file-loader'
                    }
                ]
            },
            plugins: [
                new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*', '!static-files/**/*']
                }),
                new MiniCssExtratcPlugin({
                    filename: devMode ? 'style.css' : 'style.[contenthash].css',
                    chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
                }),
                new HtmlWebpackPlugin(
                    {
                    template: 'src/index.html'
                })
            ],
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30000
                }
            },
            devServer: {
                contentBase: path.resolve(__dirname, 'public'),
                port: 3000,
                open: true,
                historyApiFallback: true,
                publicPath: '/'
            },
            devtool: devMode ? 'source-map' : '' 
    }
};