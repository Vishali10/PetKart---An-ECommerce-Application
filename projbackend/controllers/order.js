const {Order, CartProductSchema} = require('../models/order')

exports.getOrderById=(req, res, next, id)=>
{
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order)=>
    {
        if(err)
        {
            res.status(400).json({
                error: "No Order Found"
            })
        }
        req.order=order;
        next();
    })
    
}


exports.createOrder=(req, res)=>
{
    req.body.order.user = req.profile;
    const order = new Order[req.body.order]
    order.save((err, order)=>
    {
        if(err)
        {
            return res.status(401).json({
                error: "Cannot save order to database. Try again"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders=(req, res)=>
{
    Order.find()
    .populate("user", "_id name")
    .exec((err, orders)=>
    {
        if(err)
        {
            return res.status(400).json(
                {
                    error: "No Orders Found"
                })
        }
        res.json(orders);
    })
}

exports.getOrderStatus=(req, res)=>
{
    res.json(Order.Schema.status.path("status").enumValues);
}

exports.updateOrderStatus=(req, res)=>
{
    Order.update(
        {_id: req.body.orderId},
        {$set: req.body.status},
        (err, order)=>
        {
            if(err)
            {
                return res.status(401).json({
                    error:"Unable to update Order Status"
                })
            }
            res.json(order);
        }
    )
}