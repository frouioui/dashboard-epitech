import axios from 'axios';

function getAuthorizeGitHub() {
    let scope = "scope=repo"
    var client_id = ""

    if (process.env.REACT_APP_DEV_ENV == "TRUE") {
        client_id = "client_id=708e6c22ba6e677ff339"
    } else {
        // prod oauth
    }
    return "https://github.com/login/oauth/authorize?" + client_id + "&" + scope + "&state=123"
}

function codeOauthGitHub(code) {
    var client_id = ""
    var client_secret = ""
    var url = ""
    if (process.env.REACT_APP_DEV_ENV == "TRUE") {
        client_id = "708e6c22ba6e677ff339"
        client_secret = "1a47bd582d062c970a956ab1099ba0614b133325"
        url = "http://localhost:9000/v1/users/oauth/github"
    } else {
        // add client and secret of the prod
        url = "https://api.pedafy.com/v1/users/oauth/github"
    }
    return new Promise(function (resolve, reject) {
        axios.post(url, { code: code, client: client_id, secret: client_secret }).then(res => {
            resolve(res.data)
        }).catch((err) => setImmediate(() => {
            console.log(err)
            reject(err)
        }))
    })
}

export { getAuthorizeGitHub, codeOauthGitHub }