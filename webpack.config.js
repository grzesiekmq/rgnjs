const path = require('path');



module.exports = {
	entry: {
		a: ["./js/lib/rgn/Camera.js", "./js/lib/rgn/Car.js", "./js/lib/rgn/Driver.js", "./js/lib/rgn/Maths.js",
		 "./js/lib/rgn/CarParts/Clutch.js", "./js/lib/rgn/CarParts/Differential.js", "./js/lib/rgn/CarParts/Gearbox.js", "./js/lib/rgn/CarParts/Suspension.js" ]
	},
	 module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }]},
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





