'use strict';

var gulp = require('gulp');
var util = require('util');
var connect = require('gulp-connect');
var conf = require('./conf');
var path = require('path');

function createServerTask(name, pre, root) {
gulp.task(name, pre, function() {
  connect.server({
    root: root,
    port: process.env.PORT,
    middleware: function(connect) {
        return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});
}

createServerTask( 'serve', ['watch'], [path.join(conf.paths.tmp, '/serve'), conf.paths.src]);

createServerTask( 'serve:dist', ['build'], [ conf.paths.dist ]);

createServerTask( 'serve:e2e', ['inject'],[conf.paths.tmp + '/serve', conf.paths.src]);

createServerTask( 'serve:e2e-dist', ['build'], [ conf.paths.dist ]);