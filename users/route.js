const Router = require('express').Router();
const ctrl = require('./controller');

Router.route('/')
    .get(ctrl.welcome)

Router.post('/signup',ctrl.signup)
Router.post('/login',ctrl.login)

module.exports = Router;