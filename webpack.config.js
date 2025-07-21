const path = require('path');



module.exports = {
	entry: './js/app.js',
	 module: {
    rules: [
    //  { test: /\.js$/, use: 'babel-loader' }
]
},
      resolve: {
      extensions: [".js"]
  },
  optimization: {
        minimize: false
    },
	output: {
		path: path.join(__dirname, "dist"),
		filename: "rgn.js"
	}
};





