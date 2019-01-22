const path = require("path");

module.exports = {
	entry: [ "babel-polyfill", "./src/index.js" ],
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ]
			},
			{
				test: /\.(jpg|png|svg)$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[hash].[ext]"
				}
			}
		]
	},

	plugins: [
	],
	node: {
		fs: "empty"
	},
	resolve: {
		extensions: [
			".js",
			".jsx"
		]
	}
};
