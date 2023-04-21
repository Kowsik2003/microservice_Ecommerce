const Router = require('express').Router;
const ctrl = require('./controller');

Router.route('/')
    .get(ctrl.welcome)

module.exports = Router;