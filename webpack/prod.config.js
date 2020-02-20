const webpack = require("webpack");
const config = require("../webpack.config.js");

config.watch = false;
config.entry = {
	functions: "./src/js/functions.js",
	screen: "./src/scss/screen.scss"
};
config.plugins.push(
	new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: '"production"'
		}
	})
);
module.exports = config;
