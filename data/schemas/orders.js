const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    orderId: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    orders: Array
});

module.exports = mongoose.model('Order', ordersSchema);