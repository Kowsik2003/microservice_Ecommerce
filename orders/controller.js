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
            price+= el.price*el.qty;
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

        stan.publish("order:created",JSON.stringify(ord),() => {
            console.log("Order Placed event")
        })

        res.status(200).json({
            status : 'success',
            data : {
                order : ord
            }
        })        
    } catch(err) {
        next(err)
    }
}

exports.getOrderOfUser = async (req,res,next) => {
    try {
        const id = req.params.id;

        const ord = await Order.find({
            userId : id
        }) ;

        res.status(200).json({
            status : "success",
            data : {
                no_of_orders : ord.length,
                userId : id,
                orders : ord
            }
        })
    } catch(err) {
        next(err)
    }
}

exports.getAllOrder = async (req,res,next) => {
    try {
        const id = req.params.id;

        const ord = await Order.find({
        }) ;

        res.status(200).json({
            status : "success",
            data : {
                no_of_orders : ord.length,
                orders : ord
            }
        })
    } catch(err) {
        next(err)
    }
}