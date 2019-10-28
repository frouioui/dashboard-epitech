'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    // Incomes
    app.route('/v1/users/home')
        .get(controllers.home)

    app.route('/v1/users')
        .get(controllers.home)
};