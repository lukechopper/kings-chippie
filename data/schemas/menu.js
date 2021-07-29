const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    subDesc: {
        type: [String],
        required: false
    }
});

const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    items: {
        type: [menuItemsSchema],
        required: true
    }
});

module.exports = mongoose.model('Menu', menuSchema);