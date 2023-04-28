const Router = require('express').Router();
const ctrl = require('./controller');

Router.route('/')
    .get(ctrl.welcome)

Router.post('/',ctrl.placeOrder)
// Router.post('/login',ctrl.login)

// Router.patch('/cart',ctrl.addToCart);
// Router.get('/cart/:id',ctrl.getCart);

module.exports = Router;