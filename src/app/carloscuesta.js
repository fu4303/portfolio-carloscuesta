'use strict';

var express = require('express'),
    carloscuesta = express(),
    sassMiddleware = require('node-sass-middleware'),
    routes = require('./routes'),
    compression = require('compression');

carloscuesta.use(function (req, res, next) {
    req.headers['cache-control'] = 'max-age=86400, public';
	res.setHeader('cache-control', 'public, max-age=86400');
    next();
});
carloscuesta.use(compression());
carloscuesta.set('etag', false);
carloscuesta.set('views', __dirname + '/templates');
carloscuesta.set('view engine', 'jade');
carloscuesta.use(sassMiddleware({
    src: __dirname+'/styles',
    dest: __dirname+'/static/css',
    outputStyle: 'compressed'
}));

carloscuesta.use(express.static(__dirname +  '/static/img', {maxage: 86400000}));
carloscuesta.use(express.static(__dirname +  '/static/js/', {
    maxage: 86400000,
    setHeaders: function(res) {
        res.setHeader('Expires', new Date(Date.now() + 86400000*30).toUTCString());
    }
}));
carloscuesta.use(express.static(__dirname +  '/static/css/', {
    maxage: 86400000,
    setHeaders: function(res) {
        res.setHeader('Expires', new Date(Date.now() + 86400000*30).toUTCString());
    }
}));
carloscuesta.get('/', routes.index);
carloscuesta.get('/'+process.env.PARAM_CLEAN, routes.cacheClean);

module.exports = carloscuesta;
