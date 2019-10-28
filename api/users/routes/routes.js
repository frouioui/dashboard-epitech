'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    // Incomes
    app.route('/home')
        .get(controllers.home)

    app.route('/')
        .get(controllers.home)
};