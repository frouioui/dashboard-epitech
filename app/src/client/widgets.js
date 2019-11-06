function getAllServices() {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/services/').then(res => res.json())
            .then(json => {
                console.log(json)
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getAllWidgets() {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/').then(res => res.json())
            .then(json => {
                console.log(json)
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getAllWidgetsOfOneUser(user_id) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/' + user_id + '/all/widgets').then(res => res.json())
            .then(json => {
                console.log(json)
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function deleteOneWidgetParam(param_id) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/params/delete/' + param_id, { method: 'delete' }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function deleteOneWidget(widget_id) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/delete/' + widget_id, { method: 'delete' }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function modifyParamValue(param_id, new_value) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/param/' + param_id, { method: 'put', body: JSON.stringify({ 'value': new_value }) }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function modifyWidgetPosition(widget_id, new_position) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/position/' + widget_id, { method: 'put', body: JSON.stringify({ 'value': new_position }) }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function addUserWidget(user_id, position, widget_id) {
    let data = { 'user_id': user_id, 'position': position, 'widget_id': widget_id }
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user', { method: 'post', body: JSON.stringify(data) }).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getParamsOfUserWidget(widget_id) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/user/params/search?key=widget_user_id&value=' + widget_id).then(res => res.json())
            .then(json => {
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function getParamsOfWidget(widget_id) {
    return new Promise(function (resolve, reject) {
        fetch('http://localhost:9001/v1/widgets/params/search?key=widget_id&value=' + widget_id).then(res => res.json())
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
    getParamsOfWidget
}