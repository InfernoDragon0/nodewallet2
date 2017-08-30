var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
var authenticator = require("./nodemodjs/security.js");
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

//test
/**
 * listens to dynamic port if online, and local testing uses 5000
 */
app.listen(process.env.PORT || port);
console.log("=Listening on port " + port);

app.get('/loginpin', function (req, res) { //base page
    res.render(path.join(__dirname + '/index.html'));
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

                            contactno:value[1]
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
        var dpromise = database.WalletTransaction(req.body.customerid,req.body.amount,"btID",req.body.merchantid);
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
       database.WalletTransaction(req.query.customerid, req.query.amount,'BTID',req.query.merchantid,res );

        
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