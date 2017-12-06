var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();

app.set('superSecret', 'tajnySklep');


var UserSchema = new mongoose.Schema({
        username: String,
        password: String
    },
    {collection: 'Users'}
);

var PostBasket = require('./basketSchema');



UserSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};
var User = mongoose.model('User', UserSchema);

router.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err)
            return res.status(500).send({
                success: false,
                message: 'Database fail'
            });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            if (user.password !== req.body.password) {
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                const payload = {
                    username: user.username
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: 1440
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

router.post('/register', function(req, res) {
    if (req.body.password === '') {
        return res.status(401).send({
            success: false,
            message: 'Write a password',
            status: 'No password'
        });
    }

    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err)
            return res.status(500).send({
                success: false,
                message: 'Database fail'
            });
        if (user) {
            return res.status(401).send({
                success: false,
                message: 'Username already in db'
            });
        } else {
            User.create({
                username: req.body.username,
                password: req.body.password
            }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                PostBasket.create({
                    login: req.body.username,
                    iloscWKoszyku: 0,
                    sumaWartosci: 0,
                    produktyWKoszyku: []
                }, function(err, basket) {
                    if (err) {
                        res.send(err);
                    }
                });

                res.json(user);
            });
        }
    });
});

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

module.exports = router;
