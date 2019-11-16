'use strict';
var cors = require('cors')

module.exports = function (app) {
    var controllers = require('../controllers/controllers');
    var services = require('../controllers/services');
    var widgets = require('../controllers/widgets');
    var widgetParams = require('../controllers/widgetParams');
    var widgetsUser = require('../controllers/widgetsUser');
    var widgetUserParams = require('../controllers/widgetParamsUser');

    app.options('*', cors())

    // Incomes
    app.route('/v1/widgets/home')
        .get(controllers.home)

    app.route('/v1/widgets/user/:user_id/all/widgets')
        .get(widgetsUser.getOneUserAllWidgets)

    app.route('/v1/widgets')
        .get(widgets.getAllWidgets)
        .post(widgets.addOneWidget)

    app.route('/v1/widgets/search')
        .get(widgets.getOneWidgetByValue)

    app.route('/v1/widgets/services')
        .get(services.getAllServices)

    app.route('/v1/widgets/service/:id')
        .get(services.getOneService)

    app.route('/v1/widgets/service')
        .post(services.addOneService)

    app.route('/v1/widgets/params')
        .get(widgetParams.getAllWidgetParams)

    app.route('/v1/widgets/params/search')
        .get(widgetParams.getOneWidgetParamByValue)

    app.route('/v1/widgets/param')
        .post(widgetParams.addOneWidgetParam)

    app.route('/v1/widgets/user')
        .get(widgetsUser.getAllUserWidget)
        .post(widgetsUser.addOneUserWidget)

    app.route('/v1/widgets/user/last/position')
        .get(widgetsUser.getLastPositionUserWidget)

    app.route('/v1/widgets/user/position/:id')
        .put(widgetsUser.modifyPositionUserWidget)

    app.route('/v1/widgets/user/:user_id/delete/widget/:id')
        .delete(widgetsUser.deleteOneUserWidget)

    app.route('/v1/widgets/user/search')
        .get(widgetsUser.getUserWidgetsByValue)

    app.route('/v1/widgets/user/params')
        .get(widgetUserParams.getAllUserWidgetParams)

    app.route('/v1/widgets/user/param')
        .post(widgetUserParams.addOneUserWidgetParam)

    app.route('/v1/widgets/user/param/:id')
        .put(widgetUserParams.modifyValueUserWidgetParam)

    app.route('/v1/widgets/user/params/delete/:id')
        .delete(widgetUserParams.deleteOneUserWidgetParam)

    app.route('/v1/widgets/user/params/search')
        .get(widgetUserParams.getUserWidgetParamsByValue)

};