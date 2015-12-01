var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = require("./public/assignment/server/app.js");

// configure server
var appServer = express();
appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({ extended: true }));
appServer.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// connect to db
var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", initializeApp);

// initialize app once db is connected
function initializeApp(callback) {
	console.log("db connection open!");
	app(appServer, mongoose);
	appServer.listen(port, ipaddress);
}