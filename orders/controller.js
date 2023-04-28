const AppError = require('./utils'); 
const {Order} = require('./order_model');
const stan = require('./nats');

exports.welcome = (req,res,next) => {
    res.status(200).json({
        status : 'success',
        data : null,
        message : "welcome"
    })
}

exports.placeOrder = async (req,res,next) => {
    try {
        let price = 0;
        const ob = []
        req.body.product.forEach(el=> {
            price+= el.price;
            ob.push({
                id : el._id,
                qty : el.qty
            })
        })


        const ord = await Order.create({
            userId : req.body.userId,
            product : ob,
            totalPrice : price
        });

        
    } catch(err) {
        next(err)
    }
}
