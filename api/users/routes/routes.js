'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    // Incomes
    app.route('/v1/users/home')
        .get(controllers.home) // to delete

    app.route('/v1/users')
        .get(controllers.getAllUsersRoute) // get all the users

    app.route('/v1/users/new')
        .post(controllers.home) // new user

    app.route('/v1/users/login')
        .get(controllers.home) // login user
};