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


export { getAllServices, getAllWidgets }