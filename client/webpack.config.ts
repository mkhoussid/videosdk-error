import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {} from 'webpack-dev-server';

const webpackConfig = (env): Configuration => {
	return {
		entry: './src/index.tsx',
		...(env.production || !env.development ? {} : { devtool: 'eval-source-map' }),
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			//TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
			//@ts-ignore
			plugins: [new TsconfigPathsPlugin()],
			alias: {
				process: 'process/browser',
			},
		},
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'build.js',
			publicPath: '/',
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					options: {
						transpileOnly: env.development,
					},
					exclude: [/dist/, /node_modules/],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(?:ico|gif|png|jpeg|webp|svg)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(scss|css)$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			new webpack.DefinePlugin({
				'process.env.PRODUCTION': env.production || !env.development,
				'process.env.NAME': JSON.stringify(require('./package.json').name),
				'process.env.VERSION': JSON.stringify(require('./package.json').version),
			}),
			new ForkTsCheckerWebpackPlugin({
				eslint: {
					files: './src/**/*.{ts,tsx,js,jsx}',
				},
			}),
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
			new webpack.EnvironmentPlugin({ ...env }),
		],
		devServer: {
			historyApiFallback: {
				index: '/',
			},
			port: 3000,
		},
	};
};

export default webpackConfig;
