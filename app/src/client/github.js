import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9004"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

async function getLastIssueRepo(params, auth) {
    if (!auth || auth == "") {
        return "no token"
    }
    var repo = "";
    var owner = "";
    await params.forEach(param => {
        if (param.name == "Repo") {
            repo = param.value
        } else if (param.name == "Owner") {
            owner = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/github/' + owner + '/' + repo + '/last/issue', { headers: { 'Authorization': auth } }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

async function getLastIssuePull(params, auth) {
    if (!auth || auth == "") {
        return "no token"
    }
    var repo = "";
    var owner = "";
    await params.forEach(param => {
        if (param.name == "Repo") {
            repo = param.value
        } else if (param.name == "Owner") {
            owner = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/github/' + owner + '/' + repo + '/last/pull', { headers: { 'Authorization': auth } }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getLastIssueRepo,
    getLastIssuePull,
}