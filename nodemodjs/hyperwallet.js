var request = require('request');

var url = "http://138.75.38.233:3000/"

getWalletByID(1)

function getWalletByID(id) {
    request(url + 'api/Wallet?filter=%7B%22clientID%22%3A%20%22' + id + '%22%7D', function (error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred 
            return;
        }
        console.log('body:', body); 
      });
}

function insertNewWallet(id, clientid, value) {
    request.post(url + 'api/wallet', 
        {form:
            {
                "$class": "org.acme.jenetwork.Wallet",
                "walletID": "walletID:" + id,
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
}

function createTransaction(walletid, value) {
    request.post(url + 'api/walletTransaction', 
    {form:
        {
            "$class": "org.acme.jenetwork.walletTransaction",
            "asset": "resource:org.acme.jenetwork.Wallet#walletID:" + walletid,
            "newValue": value
          
        }
    }, function (error, response, body) {
    if (error) {
        console.log('error:', error); // Print the error if one occurred 
        return;
    }
    console.log('body:', body);
});
}