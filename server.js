require('dotenv').config();
const session = require('express-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const mongoose = require('mongoose');
const menuData = require('./data/menu');
//Utils
const {reverseEscapeHtml} = require('./utils');
//SCHEMA
const Menu = require('./data/schemas/menu');
const Order = require('./data/schemas/orders');

mongoose.connect('mongodb://localhost/chippySolihull', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', async () => {
    if(await Menu.countDocuments().exec() > 0) return;
    Menu.insertMany(menuData, (err) => {
        if(err) return console.log(err);
        console.log('SUCCESS');
    });
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

app.get('/',async (req, res) => {

    const data = await Menu.find({}).exec();

    res.render('index', {menu: data});
});

app.get('/menu/:parentId/:childId', (req, res) => {
    Menu.findById(req.params.parentId, (err, data) => {
        if(err) return console.log(err);
        let menuItem = null;
        data.items.forEach(item => {
            if(menuItem) return;
            if(item.id === req.params.childId){
                menuItem = item;
            }
        });
        res.send({data: menuItem});
    });
});

//Stripe payment
app.post('/charge', (req, res) => {
    try{
        stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
        }).then(customer => {
            stripe.charges.create({
                amount: Number(req.body.price) * 100,
                currency: 'gbp',
                customer: customer.id
            })
        }).then(async () => {
            let ranNum = null;
            let repeat = true;
            while(repeat){
                ranNum = getRndInteger(100000, 999999);
                let sameOrder = await Order.findOne({orderId: ranNum});
                if(!sameOrder) repeat = false;
            }
            req.body.info.forEach(info => {
                info.title = reverseEscapeHtml(info.title);
                if(info.options){
                    info.options = reverseEscapeHtml(info.options);
                }
            });
            req.session.ranNum = ranNum;
            await Order.create({orderId: ranNum, name: req.body.name, email: req.body.email, orders: req.body.info,
                 price: '£'+Number(req.body.price).toFixed(2)});
            res.send('SUCCESS!');
        }).catch(err => console.log(err))
    }catch(err){
        res.send(err);
    }
});

app.get('/charge', (req, res) => {
    if(!req.session.ranNum){
        res.sendStatus(404);
    }
    res.render('paymentSuccess', {ranNum: req.session.ranNum});
});

app.get('/orders', async (req, res) => {

    res.render("orders");
});

app.get('/fetch-orders', async (req, res) => {
    let data = await Order.find({}).exec();

    data = data.reverse();

    res.send({data});
});

app.post('/delete-order', (req, res) => {
    Order.deleteOne({orderId: Number(req.body.orderId)}, err => {
        if(err) return console.log(err);
        res.send('SUCCESS!');
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on PORT 3000');
});