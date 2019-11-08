var axios = require('axios')

module.exports = {
    accessToken,
    getUserInfo
}

function accessToken(code, secret, client) {
    var url = 'https://github.com/login/oauth/access_token?client_id=' + client + '&client_secret=' + secret + '&code=' + code + '&state=123'
    return new Promise(function (resolve, reject) {
        axios.default.post(url, {}, { headers: { 'Accept': 'application/json' } }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => {
            console.log(err)
            reject(err)
        }))
    })
}

function getUserInfo(auth) {
    var url = 'https://api.github.com/user'
    return new Promise(function (resolve, reject) {
        axios.default.get(url, { headers: { 'Authorization': 'token ' + auth } }).then(res => {
            resolve(res.data)
        }).catch((err) => setImmediate(() => {
            console.log(err)
            reject(err)
        }))
    })
}