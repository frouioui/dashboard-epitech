'use strict';
var cors = require('cors')

module.exports = function (app) {
    var controllers = require('../controllers/controllers');

    app.options('*', cors())
    // Incomes
    app.route('/v1/github/:owner/:repo/last/issue')
        .get(controllers.getRepoLastIssue)

    app.route('/v1/github/:owner/:repo/last/pull')
        .get(controllers.getRepoLastPull)
};