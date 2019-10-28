var express = require('express')
var app = express()
var port = process.env.PORT || 8080;

var routes = require('./routes/routes');
routes(app);

app.listen(port);

console.log('Default App started on: ' + port);
