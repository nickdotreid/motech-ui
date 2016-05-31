var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var Dgeni = require('dgeni');

gulp.task('dgeni', function () {
	var dgeni = new Dgeni([require(path.join(process.cwd(), 'dgeni.config'))]);
    return dgeni.generate();
});



