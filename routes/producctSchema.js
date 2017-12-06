var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
        _id: String,
        nazwa: String,
        opis: String,
        cena: Number,
        kategoria: String,
        promocja: Number,
        zdjecie: Array
    },
    {collection: 'Products'}
);
var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
