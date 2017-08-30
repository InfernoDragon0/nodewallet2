var timetoexpire = 15 * 60;
var crypto = require('crypto');
var encryption = 'sha256';
const database = require('./BTCosmosDB.js');

module.exports.checkAuthorized = checkAuthorized;
module.exports.authRequest = authRequest;

function checkAuthorized(session) {
    var timenow = Math.floor(Date.now() / 1000);
    let timeprevious = parseInt(session["authorized"]);

    console.log("nowtime is " + timenow);
    console.log("time is " + timeprevious);
    console.log("Expiring is " + timetoexpire);
    console.log("Difference is " + (timenow - timeprevious));

    return timenow - timeprevious < timetoexpire;
}

function authRequest(sess, user, pin) {
    return new Promise((resolve, reject) => {
        var promisething = database.retrievePinandContactNo(user);
        promisething.then((value) => {
            var hashverify = crypto.createHash('sha256').update(pin).digest('base64');
            if (hashverify == value[0]) {
                sess["authorized"] = Math.floor(Date.now() / 1000); //sets current time as authorized timing
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    })
}

function auth2FA(pin2) {

}