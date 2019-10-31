'use strict';

module.exports = function (app) {
    var controllers = require('../controllers/controllers');
    var services = require('../controllers/services');
    var widgets = require('../controllers/widgets')

    // Incomes
    app.route('/v1/widgets')
        .get(widgets.getAllWidgets)
        .post(widgets.addOneWidget)

    app.route('/v1/widgets/home')
        .get(controllers.home)

    app.route('/v1/widgets/search')
        .get(widgets.getOneWidgetByValue)

    app.route('/v1/widgets/services')
        .get(services.getAllServices)

    app.route('/v1/widgets/service/:id')
        .get(services.getOneService)

    app.route('/v1/widgets/service')
        .post(services.addOneService)

};