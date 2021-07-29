const express = require('express');
const mongoose = require('mongoose');
//SCHEMA
const Menu = require('./data/schemas/menu');

mongoose.connect('mongodb://localhost/chippySolihull', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Mongoose has successfully connected!');
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',async (req, res) => {

    const data = await Menu.find({}).exec();

    res.render('index', {menu: data});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on PORT 3000');
});