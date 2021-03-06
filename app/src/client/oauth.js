import axios from 'axios';

function getAuthorizeGitHub() {
    let scope = "scope=repo"
    var client_id = ""

    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        client_id = "client_id=708e6c22ba6e677ff339"
    } else {
        client_id = "client_id=7104f4c3ca00d47ee366"
    }
    return "https://github.com/login/oauth/authorize?" + client_id + "&" + scope + "&state=123"
}

function codeOauthGitHub(code) {
    var client_id = ""
    var client_secret = ""
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        client_id = "708e6c22ba6e677ff339"
        client_secret = "1a47bd582d062c970a956ab1099ba0614b133325"
        url = "http://localhost:9000/v1/users/oauth/github"
    } else {
        client_id = "7104f4c3ca00d47ee366"
        client_secret = "f76582a7ff19ae7cd8bac4b4fc375616f5dcc4ca"
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