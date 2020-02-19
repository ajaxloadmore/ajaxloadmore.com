const webpack = require('webpack');
const config = require('../webpack.config.js');

config.watch = false;
config.entry = {
		'functions.min': './src/js/functions.js',
		'screen.min': './src/scss/screen.scss'
	},

	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	);
module.exports = config;
