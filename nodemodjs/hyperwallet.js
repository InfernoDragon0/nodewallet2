var request = require('request');

// var url = "http://138.75.38.233:3000/"

var url = "http://localhost:3000/"


// insertNewClientWallet(123,123,0)
// getClientWalletByClientID(12345);

// processTransaction(123,123,50);

function processTransaction(clientID,merchantID,amount){
    var vpromise = getClientWalletByClientID(clientID)
    vpromise.then((value)=>{
        if(value.value-amount >= 0){
            createTransaction(clientID,merchantID,amount)
            
        }
        else{
            console.log("insufficent funds please top up!")
        }
    })
};

function retrieveTransaction() {
    request(url + 'api/system/transactions', function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body);
    });
};



function getClientWalletByClientID(id) {
    return new Promise((resolve, reject) => {
        
    request(url + 'api/clientWallet/clientWalletID%3A'+id, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body);
        // console.log(JSON.parse(body)[0].clientID);
        resolve(JSON.parse(body));
    });
    })
};

function insertNewClientWallet(id, clientid, value) {
    request.post(url + 'api/clientWallet',
        {
            form:
            {
                "$class": "org.acme.jenetwork.clientWallet",
                "clientWalletID": "clientWalletID:" + id,
                "clientID": clientid,
                "value": value
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};

function getMerchantWalletByMerchantID(id) {
    request(url + 'api/merchantWallet/merchantWalletID%3A' + id, function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body);
    });
};

function insertNewMerchantWallet(id, merchantid, value) {
    request.post(url + 'api/merchantWallet',
        {
            form:
            {
                "$class": "org.acme.jenetwork.merchantWallet",
                "merchantWalletID": "merchantWalletID:" + id,
                "merchantID": +merchantid,
                "value": +value
            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('body:', body);
        });
};
createTransactionTopUpWallet(12345,100);
function createTransaction(clientWalletID, merchantWalletID, value) {
    request.post(url + 'api/walletTransactionPay',
        {
            form:
            {
                "$class": "org.acme.jenetwork.walletTransactionPay",
                "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:" + clientWalletID,
                "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:" + merchantWalletID,
                "amount": value

            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('createTransaction-body:', body);
            console.log("Transaction Sucess!")
        });
};

function createTransactionRefund(clientWalletID, merchantWalletID, value) {
    request.post(url + 'api/walletTransactionRefund',
        {
            form:
            {
                "$class": "org.acme.jenetwork.walletTransactionRefund",
                "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:" + clientWalletID,
                "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:" + merchantWalletID,
                "amount": value

            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('createTransactionRefund-body:', body);
            console.log("Transaction Sucess!")
        });
};

function createTransactionTopUpWallet(clientWalletID, value) {
    request.post(url + 'api/walletTransactionTopUp',
        {
            form:
            {
                "$class": "org.acme.jenetwork.walletTransactionTopUp",
                "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:" + clientWalletID,
                "amount": value

            }
        }, function (error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred 
                return;
            }
            console.log('createTransactionTopUpWallet-body:', body);
            console.log("Transaction Sucess!")
        });
};


