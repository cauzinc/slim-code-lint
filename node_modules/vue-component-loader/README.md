# Vue Component Loader
[mpl2]: https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2)
[travis]: https://travis-ci.org/strootje/vue-component-loader
[coveralls]: https://coveralls.io/github/strootje/vue-component-loader?branch=master
[loaderutils]: https://www.npmjs.com/package/loader-utils
[vueloader]: https://www.npmjs.com/package/vue-loader
[vuetemplateloader]: https://www.npmjs.com/package/vue-template-loader

[![Build Status](https://travis-ci.org/strootje/vue-component-loader.svg?branch=master)][travis]
[![Coverage Status](https://coveralls.io/repos/github/strootje/vue-component-loader/badge.svg?branch=master)][coveralls]

## Dependencies
* [loader-utils][loaderutils]
* [vue-loader][vueloader]
* [vue-template-loader][vuetemplateloader]

## Example use
webpack.config.js:

	module.exports = {

		// ...

		module: {
			rules: [

				// ...

				{
					test: /\.html$/,
					use: [
						{
							loader: 'vue-component-loader',
							options: {
								view: { dir: '/path/to/views', ext: 'html' },
								script: { dir: '/path/to/scripts', ext: 'js' },
								style: { dir: '/path/to/styles', ext: 'css' }
							}
						}
					]
				}

				// ...
			]
		}

		// ...

	};

## Installation
	npm install --save-dev vue-component-loader

## License
[Mozilla Public License, version 2.0][mpl2]
