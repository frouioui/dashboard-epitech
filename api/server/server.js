var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express()
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(cors())

app.use(bodyParser.json())

var routes = require('./routes/routes');
routes(app);

app.listen(port);

console.log('Server REST API server started on: ' + port);
