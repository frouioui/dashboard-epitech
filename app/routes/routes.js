'use strict';

module.exports = function (app) {
    var controller = require('../controllers/controllers');

    // Incomes
    app.route('/')
        .get(controller.home)
}