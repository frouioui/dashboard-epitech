'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    // Incomes
    app.route('/v1/widget/home')
        .get(controllers.home) // to delete
};