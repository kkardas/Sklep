var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var OrderSchema = new mongoose.Schema({
        _id: String,
        login: String,
        adres: String,
        imie: String,
        nazwisko: String,
        wartosc: Number,
        zrealizowane: Boolean,
        produkty: Array
    },
    {collection: 'Orders'}
);

var PostOrderSchema = new mongoose.Schema({
        login: String,
        adres: String,
        imie: String,
        nazwisko: String,
        wartosc: Number,
        zrealizowane: Boolean,
        produkty: Array
    },
    {collection: 'Orders'}
);
var Order = mongoose.model('Order', OrderSchema);
var PostOrder = mongoose.model('PostOrder', PostOrderSchema);

router.get('/orders/', function(req, res) {
    Order.find({zrealizowane: req.query.realized},
        function (err, orders) {
            if (err)
                res.send(err);
            res.json(orders);
        });
});

router.get('/orders/username/:username', function(req, res) {
    Order.find({login: req.query.username},
        function (err, orders) {
            if (err)
                res.send(err);
            res.json(orders);
        });
});

// router.post('/orders/', function(req, res) {
//     PostOrder.create({
//         adres : req.body.adres,
//         login: req.body.login,
//         imie : req.body.imie,
//         nazwisko: req.body.nazwisko,
//         wartosc: req.body.wartosc,
//         zrealizowane: req.body.zrealizowane,
//         produkty: req.body.produkty
//     }, function(err, order) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(order);
//     });
// });

router.put('/orders/:order_id', function (req, res) {
    PostOrder.findById(req.params.order_id, function(err, order) {
        if (err)
            res.send(err);

        console.log(order);
        order.adres = req.body.adres;
        order.login = req.body.login;
        order.imie = req.body.imie;
        order.nazwisko = req.body.nazwisko;
        order.wartosc = req.body.wartosc;
        order.zrealizowane = req.body.zrealizowane;
        order.produkty = req.body.produkty;
        order.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'order updated!'});
        });

    });
});

module.exports = router;
