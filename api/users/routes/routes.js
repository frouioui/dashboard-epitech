'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    // Incomes
    app.route('/')
        .get(controllers.home)
};