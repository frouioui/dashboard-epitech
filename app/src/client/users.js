function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV == "TRUE") {
        url = "http://localhost:9000"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

function loginUser() {
    return new Promise(function (resolve, reject) {
        let data = { 'email': email, 'password': password }
        fetch(getURL + '/v1/users/login', { method: 'post', body: JSON.stringify(data) }).then(res => res.json())
            .then(json => {
                console.log(json)
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function createUser(email, password) {
    return new Promise(function (resolve, reject) {
        let data = { 'email': email, 'password': password }
        fetch(getURL + '/v1/users/new', { method: 'post', body: JSON.stringify(data) }).then(res => res.json())
            .then(json => {
                console.log(json)
                resolve(json)
            }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    createUser,
    loginUser
}