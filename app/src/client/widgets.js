import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9001"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

function getAllServices() {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/services/').then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getAllWidgets() {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/').then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getAllWidgetsOfOneUser(user_id) {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/user/' + user_id + '/all/widgets').then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function deleteOneWidgetParam(param_id) {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/user/params/delete/' + param_id, { method: 'delete' }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function deleteOneWidget(user_id, widget_id) {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/user/' + user_id + '/delete/widget/' + widget_id, { method: 'delete' }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function modifyParamValue(param_id, new_value) {
    return new Promise(function (resolve, reject) {
        axios.put(getURL() + '/v1/widgets/user/param/' + param_id, { value: new_value }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function modifyWidgetPosition(user_id, widget_id, new_position) {
    return new Promise(function (resolve, reject) {
        axios.put(getURL() + '/v1/widgets/user/position/' + widget_id, { position: new_position, user_id: user_id }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getLastWidgetPosition(user_id) {
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/widgets/user/last/position?user_id=' + user_id).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function addUserWidget(user_id, position, widget_id, timer) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/widgets/user', { user_id: user_id, position: position, widget_id: widget_id, timer: timer }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function addUserParam(user_id, value, param_id, widget_id) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/widgets/user/param', { user_id: user_id, value: value, widget_user_id: widget_id, widget_param_id: param_id }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getParamsOfUserWidget(widget_id) {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/user/params/search?key=widget_user_id&value=' + widget_id).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getParamsOfWidget(widget_id) {
    return new Promise(function (resolve, reject) {
        fetch(getURL() + '/v1/widgets/params/search?key=widget_id&value=' + widget_id).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getAllServices,
    getAllWidgets,
    getAllWidgetsOfOneUser,
    deleteOneWidgetParam,
    deleteOneWidget,
    modifyParamValue,
    modifyWidgetPosition,
    addUserWidget,
    getParamsOfUserWidget,
    getParamsOfWidget,
    addUserParam,
    getLastWidgetPosition
}