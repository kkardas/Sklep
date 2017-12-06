var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://user:qwerty@ds129156.mlab.com:29156/sklepinternetowy');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'blad polaczenia'));
db.once('open', function () {
    console.log('polaczenie udane')
});
app.set('superSecret', 'tajnySklep');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

app.options('*', cors());


app.use('/', express.static(__dirname + '/'));

var order = require('./routes/order');
app.use('/api', order);

var products = require('./routes/products');
var basket = require('./routes/basket');
var orders = require('./routes/orders');
var users = require('./routes/users');
var front = require('./front');
var admin = require('./admin');
app.use('/api', products);
app.use('/api', users);
app.use('/api', orders);
app.use('/api', basket);
app.use('/admin', admin);
app.use('/', front);
var port = process.env.PORT || 3000;

var server = app.listen(port);


var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

module.exports = io;

var promotions = require('./routes/promotions');
app.use('/api', promotions);
