var express = require('express');
var logfmt = require("logfmt");
var request = require('request');

// Blockchain accounts info

var CHARITY_GUID = process.env['CHARITY_GUID'];
var CHARITY_PASS = encodeURIComponent(process.env['CHARITY_PASS']);

var FAN_GUID = process.env['FAN_GUID'];
var FAN_PASS = encodeURIComponent(process.env['FAN_PASS']);

var ADDRESSES = 'https://blockchain.info/es/merchant/$guid/list?password=$main_password';


var app = express();
app.use(logfmt.requestLogger());

/* GET home page. */
app.get('/charities', function(req, res) {
  var url = ADDRESSES.replace('$guid', CHARITY_GUID).replace('$main_password', CHARITY_PASS);
  request(url, function(error, response, body){
    if (error) throw error;

    res.json(JSON.parse(body)['addresses']);
  });
});

app.get('/fans', function(req, res) {
  var url = ADDRESSES.replace('$guid', FAN_GUID).replace('$main_password', FAN_PASS);
  console.log(process.env['FAN_PASS'], FAN_PASS, url);
  request(url, function(error, response, body){
    if (error) throw error;

    res.json(JSON.parse(body)['addresses']);
  });
});

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
