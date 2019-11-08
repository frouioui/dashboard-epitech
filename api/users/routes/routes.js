'use strict';
var cors = require('cors')

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    app.options('*', cors())
    // Incomes
    app.route('/v1/users/home')
        .get(controllers.home) // to delete

    app.route('/v1/users')
        .get(controllers.getAllUsersRoute) // get all the users

    app.route('/v1/users/new')
        .post(controllers.addNewUserRoute) // new user

    app.route('/v1/users/login')
        .post(controllers.loginUserRoute) // login user

    app.route('/v1/users/oauth/github')
        .post(controllers.githubLogin)
};