const mongoose = require('mongoose');

const sidesSchema = new mongoose.Schema({
    title: String,
    select: Number,
    option: {
        type: [
            {
                type: {type: String},
                price: mongoose.Mixed, //Only present if it has price listed on GUI
                options: Array,
                desc: String //Only used with 'select'
            }
        ],
    }
});

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
    },
    sides: {
        type: [sidesSchema],
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