///////////////////////////////////////////////////////////////
//   Transaction Details                                     //
//   0= Transaction - Sucess ( Braintree )                   //
//   1= Transaction - Pending ( Braintree )                  //
//   2= Transaction - ChargeBack ( Refund ) ( Braintree )    //
//   3= Transaction - Refund ( Braintree )                   //
//   4= Wallet - Top Up                                      //
//   5= Wallet - Pay                                         //
// ////////////////////////////////////////////////////////////



const docdbClient = require("documentdb").DocumentClient;
var crypto = require('crypto');
var encryption = 'sha256';

const client = new docdbClient("https://jetransact.documents.azure.com:443/", {
    masterKey: "jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA=="
});
const HttpStatusCodes = {
    NOTFOUND: 404
}

const databaseUrl = `dbs/jElement`;
const collectionUrlcustomerBTDetail = `${databaseUrl}/colls/customerBTDetail`;
const collectionUrltransactionDetail = `${databaseUrl}/colls/transactionDetail`;

module.exports.insertNewCustomer = insertNewCustomer;
module.exports.findBTtoken = findBTtoken;
module.exports.insertTransaction = insertTransaction;
module.exports.paymentSucessful = paymentSucessful;
module.exports.retrievePinandContactNo = retrievePinandContactNo;
module.exports.WalletTransaction = WalletTransaction;



////////////////////////////////////Functions in Use////////////////////////////////////
// insert new client with new bttoken
function insertNewCustomerDataInput(data) {
    client.createDocument(collectionUrl, data, (err, created) => {
        if (err) {
            console.log(JSON.stringify(err));
        } else {
            console.log(JSON.stringify(created));
        }
    });
};

function insertNewCustomer(newcustomer_id, newBTwalletToken, customer_contact_no, pin_6digit) {
    pin_6digit = crypto.createHash('sha256').update(pin_6digit).digest('base64');
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from root r where r.customer_id='" + newcustomer_id + "'").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            } else {
                if (results.length < 1) {
                    console.log("No existing customer found");
                    insertNewCustomerDataInput({
                        'id': newcustomer_id,
                        'customer_id': newcustomer_id,
                        'customer_BTwalletToken': newBTwalletToken,
                        'contact_No': customer_contact_no,
                        'wallet_id': newcustomer_id,
                        'wallet_amt': 0,
                        'pin_6digit': pin_6digit
                    });
                    resolve('-1');
                    return;
                } else {
                    console.log("Customer Exists");
                }

            }
        });
    });
};
// findBTtoken('54321');
// find client token for existing client ID
function findBTtoken(customerID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from root r where r.customer_id='" + customerID + "'").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            } else {
                if (results.length < 1) {
                    console.log("No data found");
                    resolve('-1');
                    return;
                }
                for (let result of results) {
                    console.log("----------");
                    var scustmoer_id = result["customer_id"];
                    var scustomer_BTtoken = result["customer_BTwalletToken"];
                    console.log("----------");
                    console.log("Searching Client ID: " + scustmoer_id);
                    console.log("Coresponding BT Token: " + scustomer_BTtoken);
                    resolve(scustomer_BTtoken);
                }
            }
        });
    });
};



function addRefund(customer_id, merchant_id, btTransaction_id, amount, order_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
                var id1 = results.length;
                var id = JSON.stringify(id1 + 1);
                var transaction_id = id;
                var datetime = Date();
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                console.log('Transaction Recorded');
                console.log('Refund - Purchase')
                console.log('Transaction ID : ' + transaction_id);
                addTransaction2db({
                    'id': id,
                    'transaction_id': transaction_id,
                    'customer_id': customer_id,
                    'merchant_id': merchant_id,
                    'btTransaction_id': btTransaction_id,
                    'datetime': datetime,
                    'dateOnly': today,
                    'amount': amount,
                    'order_id': order_id,
                    'transaction_detail': 3
                });

                resolve(transaction_id);


            };
        });
    });
};


function addTransaction2db(data) {
    client.createDocument(collectionUrltransactionDetail, data, (err, created) => {
        if (err) {
            console.log(JSON.stringify(err));
        } else {
            console.log(JSON.stringify(created));
        }
    });
}

function insertTransaction(customer_id, merchant_id, btTransaction_id, datetime, amount, order_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
                var id1 = results.length;
                var id = JSON.stringify(id1 + 1);
                var transaction_id = id;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                console.log('Transaction Recorded');
                console.log('Pending Payment - Purchase')
                console.log('Transaction ID : ' + transaction_id);
                addTransaction2db({
                    'id': id,
                    'transaction_id': transaction_id,
                    'customer_id': customer_id,
                    'merchant_id': merchant_id,
                    'btTransaction_id': btTransaction_id,
                    'datetime': datetime,
                    'dateOnly': today,
                    'amount': amount,
                    'order_id': order_id,
                    'transaction_detail': 2
                });

                resolve(transaction_id);


            };
        });
    });
};


function paymentSucessful(transaction_id, braintreeID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c where c.id='" + transaction_id + "'").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            } else {
                if (results.length < 1) {
                    console.log('No data found');
                    resolve('-1');
                    return;
                }
                for (let result of results) {
                    console.log("ihi");
                    result.transaction_detail = 0;
                    result.btTransaction_id = braintreeID;
                    let documentUrl = `${collectionUrltransactionDetail}/docs/${transaction_id}`;
                    client.replaceDocument(documentUrl, result, (err, result) => {
                        if (err) {
                            console.log(JSON.stringify(err));
                        } else {
                            resolve(result);
                        }
                    });
                };
            }
        });
    });
};
// paymentSucessful('10')
// WalletTransaction('09876',- 20.12, 'testID','null')

function WalletTransaction(clientID, Amount, btID,merchant_id,res) {
    var cpromise = updateWalletAmount(clientID, Amount);
    cpromise.then(function (value) {
        console.log(value)
        if (value == 'Success') {
            insertTransactionWalletTopUp(clientID, Amount, btID,merchant_id)
            if (value == 'Success') {
                res.send("Successful payment. Thank you for using the payment");
            }
            else {
                res.send("There was an error processing the payment." + value);
            }
        }
        else{};
    });
}

function updateWalletAmount(customerID, amount) {
    amount = parseFloat(amount);
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from c where c.id='" + customerID + "'").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            } else {
                if (results.length < 1) {
                    console.log('No data found');
                    resolve('-1');
                    return;
                }
                for (let result of results) {

                    result.wallet_amt = result.wallet_amt + amount;
                    if (result.wallet_amt <= 0) {
                        console.log('Insufficent Funds in Your Wallet');
                        console.log('Please top up or switch to auto-top up');
                        resolve('Insufficent Funds');
                    } else {
                        let documentUrl = `${collectionUrlcustomerBTDetail}/docs/${customerID}`;
                        client.replaceDocument(documentUrl, result, (err, result) => {
                            if (err) {
                                console.log(JSON.stringify(err));
                            } else {
                                console.log("Wallet " + amount);
                                resolve('Success');
                            }
                        });
                    };
                };
            }
        });
    });
};
// insertTransactionWalletTopUp('09876',20,'btID','123')

function insertTransactionWalletTopUp(customer_id, amount, btTransaction_id,merchant_id) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrltransactionDetail,
            "Select * from c").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
                var datetime = new Date()
                var id1 = results.length;
                var id = JSON.stringify(id1 + 1);
                var transaction_id = id;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = dd + '/' + mm + '/' + yyyy;
                console.log('Transaction Recorded');
                if (amount < 0) {
                    console.log('Wallet-Payment')
                    console.log('Transaction ID : ' + transaction_id);
                    addTransaction2db({
                        'id': id,
                        'transaction_id': transaction_id,
                        'customer_id': customer_id,
                        'merchant_id': merchant_id,
                        'btTransaction_id': 'Wallet use',
                        'datetime': datetime,
                        'dateOnly': today,
                        'amount': amount,
                        'transaction_detail': 5
                    });
                } else {
                    console.log('Wallet-TopUp')
                    console.log('Transaction ID : ' + transaction_id);
                    addTransaction2db({
                        'id': id,
                        'transaction_id': transaction_id,
                        'customer_id': customer_id,
                        'merchant_id': '-1',
                        'btTransaction_id': btTransaction_id,
                        'datetime': datetime,
                        'dateOnly': today,
                        'amount': amount,
                        'transaction_detail': 4
                    });
                };

                resolve(transaction_id);


            };
        });
    });
};

// retrievePinandContactNo('54321');
function retrievePinandContactNo(customerID) {
    return new Promise((resolve, reject) => {
        client.queryDocuments(collectionUrlcustomerBTDetail,
            "Select * from root r where r.customer_id='" + customerID + "'").toArray((err, results) => {
            if (err) {
                console.log(JSON.stringify(err));
                resolve('-1');
            } else {
                if (results.length < 1) {
                    console.log("No data found");
                    resolve('-1');
                    reject();
                    return;
                }
                for (let result of results) {
                    console.log("----------");
                    var scustmoer_id = result["customer_id"];
                    var pin_6digit = result["pin_6digit"];
                    var contact_No = result["contact_No"];
                    var arrayStorage = [pin_6digit, contact_No];
                    resolve(arrayStorage);
                }
            }
        });
    });
};





















////////////////////////////////////Functions here not in use yet////////////////////////////////////
//Change BT wallet token
function replace(documents, token) {
    let documentUrl = `${collectionUrl}/docs/${documents.customer_id}`;
    documents.id = documents.customer_id;
    documents.customer_BTwalletToken = token;
    console.log("Updated Documents");
    console.log(documents);
    return new Promise((resolve, reject) => {
        client.replaceDocument(documentUrl, documents, (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    });
}
// // id = client id 
// // replace(customer_id,token)
//replace({"customer_id": "16"}, "token 16");


//Delete document, change the id in the config file before running the function
function deleteDoc(documents) {
    let documentUrl = `${collectionUrl}/docs/${documents.id}`;
    return new Promise((resolve, reject) => {
        client.deleteDocument(documentUrl, documents, (err, result) => {
            if (err) {
                console.log(JSON.stringify(err));
            } else {
                resolve(result);
                console.log("Deleted customer_id: " + documents.id);
            }
        });
    });
}
//deleteDoc(cosmosConfig.deleteDocuments[0]);

function createDbIfNotExists() {
    client.readDatabase(databaseUrl, (err, result) => {
        if (err) {
            client.createDatabase(cosmosConfig.database, (err, created) => {
                if (err) {
                    console.log(JSON.stringify(err));

                } else {
                    console.log(JSON.stringify(created));
                }
            });
        } else {
            console.log(JSON.stringify(result));
        }
    });
};

function createCollectionIfNotExists() {
    client.readCollection(collectionUrlcustomerBTDetail, (err, result) => {
        if (err) {
            client.createCollection(databaseUrl, cosmosConfig.collection, null, (err, created) => {
                if (err) {
                    console.log(JSON.stringify(err));

                } else {
                    console.log(JSON.stringify(created));
                }
            });
        } else {
            console.log(JSON.stringify(result));
        }
    });
};

// insert documents, edit documents in the config file
function getUserDocument(documents) {
    for (let i = 0; i < documents.length; i++) {
        let documentUrl = `${collectionUrl}/docs/${documents[i].id}`;

        client.readDocument(documentUrl, null, (err, result) => {
            if (err) {
                if (err.code == HttpStatusCodes.NOTFOUND) {
                    client.createDocument(collectionUrl, documents[i], (err, created) => {
                        if (err) {
                            console.log(JSON.stringify(err));

                        } else {
                            console.log(JSON.stringify(created));


                        }
                    });
                } else {
                    console.log(JSON.stringify(err));
                }
            } else {
                console.log(JSON.stringify(result));
            }
        });
    }
}
//getUserDocument(cosmosConfig.customerBTDetaildocuments);


//test