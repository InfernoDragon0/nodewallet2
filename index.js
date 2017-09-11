var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
var authenticator = require("./nodemodjs/security.js");
var hyperwallet = require("./nodemodjs/hyperwallet.js")
const database = require("./nodemodjs/BTCosmosDB.js");
const express = require('express'); //express is good
const app = express();
//const http = require('http'); //http stuff, not needed yet
//const fs = require('fs'); //filesystem, not needed yet
const port = 5001;

app.engine('html', require('ejs').renderFile); //can use jsx also
app.use(session({
    secret: 'whatsecretshallweuse kitten',//session secret to sign sessions
    resave: true, //force save
    saveUninitialized: true,
    /*cookie: { secure: true }*/
})); //secure needs HTTPS, cookies will not be stored if running from HTTP with this option
app.use(bodyParser.json()); // supporting POST data
app.use(bodyParser.urlencoded({ extended: true })); // supportting POST data

/**
 * evals js/css/img folders for JS/CSS/image files
 */
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/img')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/src')));

//test

/* GET users listing. */
app.get('/body', function (req, res, next) {
    // Comment out this line:
    //res.send('respond with a resource');
    var cpromise = hyperwallet.retrieveTransaction();
    cpromise.then((value) => {
        res.json(
            JSON.parse(value)
        )
    })
});

    // And insert something like this instead:
    //   res.json([
    //         {
    //           "$class": "org.acme.jenetwork.walletTransactionPay",
    //           "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
    //           "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
    //           "amount": 200000000000,
    //           "transactionId": "1acce36f-064c-4302-aa86-fcefeeda3cf7",
    //           "timestamp": "2017-08-31T06:39:49.225Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.clientWallet",
    //             "clientWalletID": "clientWalletID:123",
    //             "clientID": "123",
    //             "value": 0
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.clientWallet",
    //           "transactionId": "23a12cbd-7aa6-465f-b8f7-625799b05479",
    //           "timestamp": "2017-08-31T06:35:41.696Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.merchantWallet",
    //             "merchantWalletID": "merchantWalletID:12",
    //             "merchantID": "12",
    //             "value": 0
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.merchantWallet",
    //           "transactionId": "319c804d-de26-40a4-b932-c4fd43e6f8c0",
    //           "timestamp": "2017-08-31T06:46:57.839Z"
    //         },

    //         {
    //           "$class": "org.acme.jenetwork.walletTransactionPay",
    //           "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
    //           "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
    //           "amount": 10,
    //           "transactionId": "3ec739a7-2f09-4dcb-af0c-e42b0077402b",
    //           "timestamp": "2017-08-31T07:15:05.699Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.merchantWallet",
    //             "merchantWalletID": "merchantWalletID:123",
    //             "merchantID": "123",
    //             "value": 0
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.merchantWallet",
    //           "transactionId": "43395aee-fc30-432c-a89c-21579c676e58",
    //           "timestamp": "2017-08-31T06:26:44.036Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.merchantWallet",
    //             "merchantWalletID": "merchantWalletID:12345",
    //             "merchantID": "12345",
    //             "value": 0
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.merchantWallet",
    //           "transactionId": "ca8b2e5d-bff3-413b-89e0-95a8eef3a97c",
    //           "timestamp": "2017-08-31T06:45:23.619Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.clientWallet",
    //             "clientWalletID": "walletID:123",
    //             "clientID": "123",
    //             "value": 100
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.clientWallet",
    //           "transactionId": "df6ed1c9-cd3b-44eb-8107-a91eb26228c4",
    //           "timestamp": "2017-08-31T06:25:45.419Z"
    //         },

    //         {
    //           "$class": "org.hyperledger.composer.system.AddAsset",
    //           "resources":
    //           [{
    //             "$class": "org.acme.jenetwork.clientWallet",
    //             "clientWalletID": "clientWalletID:12345",
    //             "clientID": "12345",
    //             "value": 100
    //           }],
    //           "registryType": "Asset",
    //           "registryId": "org.acme.jenetwork.clientWallet",
    //           "transactionId": "e49109fb-cc49-41fa-b404-597e86003167",
    //           "timestamp": "2017-08-31T06:26:29.714Z"
    //         },

    //         {
    //           "$class": "org.acme.jenetwork.walletTransactionPay",
    //           "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
    //           "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
    //           "amount": 5,
    //           "transactionId": "ecbd9884-e4f6-4bca-84eb-00700fed9c0b",
    //           "timestamp": "2017-08-31T06:27:23.383Z"
    //         }]);
    // });
















    /**
     * listens to dynamic port if online, and local testing uses 5000
     */
    app.listen(process.env.PORT || port);
    console.log("=Listening on port " + port);

    app.get('/loginpin', function (req, res) { //base page
        res.render(path.join(__dirname + '/index.html'));
    });
    app.get('/test', function (req, res) { //react page
        res.render(path.join(__dirname + '/public/index.html'));
    });

    app.post('/authenticate', function (req, res) { //base page
        if (!req.body.user || !req.body.pin || req.body.pin.length != 6) {
            res.send("Please input a userid and a 6 digits pin");
            return;
        }

        if (authenticator.checkAuthorized(req.session)) {
            res.send("Already Authorized. At " + req.session.authorized);
        }
        else {
            var promisething = authenticator.authRequest(req.session, req.body.user, req.body.pin);
            promisething.then((value) => {
                if (value) {
                    var promisethingno2 = database.retrievePinandContactNo(req.body.user);
                    promisethingno2.then((value) => {
                        res.render(path.join(__dirname + '/2fa.html'),
                            {

                                contactno: value[1]
                            });
                    })

                }
                else {
                    res.send("Invalid user and pin combination. try again!");
                }
            })
        }
    });

    app.post('/walletquery', (req, res) => {
        if (!req.body.customerid) {
            res.send("wallet info is alot of $$");
            return;
        }
    });

    app.post('/walletadd', (req, res) => {
        if (!req.body.transactionid || !req.body.customerid) {
            res.send("transactionid and customerid is required");
            return;
        }
    });

    app.post('/walletuse', (req, res) => {
        if (!req.body.amount || !req.body.merchantid || !req.body.customerid) {
            res.send("Please provide a proper amount, merchant id and customer id");
            return;
        }

        if (authenticator.checkAuthorized(req.session)) {
            var dpromise = database.WalletTransaction(req.body.customerid, req.body.amount, "btID", req.body.merchantid);
            dpromise.then((value) => { //send value as true or false
                if (value) {
                    res.send("Successful payment. Thank you for using the payment");
                }
                else {
                    res.send("There was an error processing the payment." + value);
                }
            });

            //TODO do wallet stuff here
            //TODO send success on update wallet
        }
        else {
            //res.send("Authorization required."); //for bot, send to storagequeue after complete
            res.redirect("/loginpin");
        }

    });

    //debug only
    app.get('/walletuse', (req, res) => {
        if (!req.query.amount || !req.query.merchantid || !req.query.customerid) {
            res.send("Please provide a proper amount, merchant id and customer id");
            return;
        }

        if (authenticator.checkAuthorized(req.session)) {
            database.WalletTransaction(req.query.customerid, req.query.amount, 'BTID', req.query.merchantid, res);


            //TODO do wallet stuff here
            //TODO send success on update wallet
        }
        else {
            //res.send("Authorization required."); //for bot, send to storagequeue after complete
            res.redirect("/loginpin");
        }

    });

    app.get('/tfasuccess', (req, res) => {
        res.send("Success 2FA authentication!");
    });

    app.use(function (req, res, next) {
        res.status(404).send("You may not view this page. Please use localhost:5001/loginpin")
    });