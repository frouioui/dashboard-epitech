var express = require('express')
var bodyParser = require('body-parser');

var app = express()
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

var routes = require('./routes/routes');
routes(app);

app.listen(port);

console.log('Users REST API server started on: ' + port);
