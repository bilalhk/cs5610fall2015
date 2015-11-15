var express = require('express');
var bodyParser = require('body-parser');
var app = require("./public/assignment/server/app.js");

var appServer = express();

appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({ extended: true }));
appServer.use(express.static(__dirname + '/public'));

// initialize app
app(appServer);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

appServer.listen(port, ipaddress);