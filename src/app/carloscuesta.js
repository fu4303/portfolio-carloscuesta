'use strict';

var express = require('express'),
    carloscuesta = express(),
    sassMiddleware = require('node-sass-middleware'),
    routes = require('./routes'),
    compression = require('compression');

carloscuesta.use(compression());

carloscuesta.set('views', __dirname + '/templates');
carloscuesta.set('view engine', 'jade');
carloscuesta.use(sassMiddleware({
    src: __dirname+'/styles',
    dest: __dirname+'/static/css',
    outputStyle: 'compressed'
}));

carloscuesta.use(express.static(__dirname +  '/static/', {maxAge: 86400000}));
carloscuesta.use(express.static(__dirname +  '/static/css/', {maxAge: 86400000}));
carloscuesta.use(express.static(__dirname +  '/static/js/', {maxAge: 86400000}));

carloscuesta.get('/', routes.index);
carloscuesta.get('/'+process.env.PARAM_CLEAN, routes.cacheClean);

module.exports = carloscuesta;
