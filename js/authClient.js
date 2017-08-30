var http = new XMLHttpRequest();

function sendAuthRequest() {
    var user = document.getElementById('userid').value;
    var pin = document.getElementById('pin').value;

    if (pin.length != 6) {
        return;
    }

    sendPost("/authenticate", "user=" + user + "&pin=" + pin);
}

function loginSMS() {
    var lock = new Auth0LockPasswordless('EtHOvCUbD2F6s46WjSx0inahQV673bq9', 'mushroom.auth0.com');
    lock.sms( {callbackURL: 'http://localhost:5001/tfasuccess'} );
}

function sendPost(url, params) {
http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        document.write(http.responseText);
        if (http.responseText.includes("Login successful")) {
            //loginSMS();
        }
    }
};
http.send(params);
}