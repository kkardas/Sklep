var mongoose = require('mongoose');

var PostBasketSchema = new mongoose.Schema({
        login: String,
        iloscWKoszyku: Number,
        sumaWartosci: Number,
        produktyWKoszyku: Array
    },
    {collection: 'Baskets'}
);
var PostBasket = mongoose.model('PostBasket', PostBasketSchema);

module.exports = PostBasket;
