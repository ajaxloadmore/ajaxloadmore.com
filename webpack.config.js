var MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
				},
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/,
				type: "asset/resource",
				generator: {
					filename: "img/[name][ext]",
				},
			},
			{
				test: /\.woff2?$|\.ttf$|\.eot$|\.otf$/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: { sourceMap: true },
					},
					{
						loader: "postcss-loader",
						options: { sourceMap: true },
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							api: "modern-compiler",
							sassOptions: { style: "expanded" },
						},
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "src/img", to: "img" }],
		}),
	],
};
