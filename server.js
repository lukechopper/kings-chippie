const express = require('express');
const mongoose = require('mongoose');
const menuData = require('./data/menu');
//SCHEMA
const Menu = require('./data/schemas/menu');

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
app.set('view engine', 'ejs');

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

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on PORT 3000');
});