const Router = require('express').Router;
const ctrl = require('./controller');

Router.route('/')
    .get(ctrl.getAllProduct)
    .post(ctrl.addProduct)

Router.route('/:id')
	.get(ctrl.getOneProduct)
    .patch(ctrl.updateProduct)
    .delete(ctrl.deleteProduct)

module.exports = Router;