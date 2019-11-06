import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV == "TRUE") {
        url = "http://localhost:9000"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

function loginUser(email, password) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/users/login', { email: email, password: password }).then(res => {
            console.log(res)
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

function createUser(email, password) {
    return new Promise(function (resolve, reject) {
        axios.post(getURL() + '/v1/users/new', { email: email, password: password }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    createUser,
    loginUser
}