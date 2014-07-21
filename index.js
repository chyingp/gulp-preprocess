/**
 * Created by a on 14-7-21.
 */
'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var pp = require('preprocess');

// Consts
const PLUGIN_NAME = 'gulp-preprocess';

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return cb();
		}

		var content = pp.preprocess(file.contents.toString(), options || {});
		file.contents = new Buffer(content);

		this.push(file);

		cb();
	});
};