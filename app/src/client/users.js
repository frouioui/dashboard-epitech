import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9000"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

function loginUser(login, password) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/users/login', { login: login, password: password }).then(res => {
            resolve(res.data)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function createUser(login, password) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/users/new', { login: login, password: password }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    createUser,
    loginUser
}