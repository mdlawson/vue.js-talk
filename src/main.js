var Vue = require('vue');
Vue.config.debug = true;
var appOptions = require('./app');

var el = document.createElement('div');
document.body.appendChild(el);

var app = new Vue(appOptions).$mount(el);
