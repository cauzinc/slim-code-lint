export default {

	target: 'node',
	externals: [ /^(?!\.|\/).+/i, ],
	entry: {
		loader: './src/lib/loader.js'
	},

	output: {
		path: './dist',
		filename: '[name].js',
		libraryTarget: 'commonjs'
	}

};
