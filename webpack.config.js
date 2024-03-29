var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var path = require("path");
var dir = "dist";

module.exports = {
	entry: {
		functions: "./src/js/functions.js",
		screen: "./src/scss/screen.scss",
	},
	output: {
		path: path.join(__dirname, dir),
		filename: "js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"],
				},
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/,
				loader: "file-loader",
				options: {
					name: "img/[name].[ext]",
					publicPath: "../",
				},
			},
			{
				test: /\.woff$|\.woff2?$|\.ttf$|\.eot$|\.otf$/,
				loader: "file-loader",
				options: {
					name: "fonts/[name].[ext]",
					publicPath: "../",
				},
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
							},
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: true,
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
								outputStyle: "expanded",
							},
						},
					],
				}),
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "css/[name].css",
		}),
		new CopyWebpackPlugin([
			{
				from: "src/img",
				to: "img",
			},
		]),
	],
};
