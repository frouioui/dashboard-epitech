'use strict';
var cors = require('cors')

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    app.options('*', cors())

    app.route('/about.json')
        .get(controllers.about)

};