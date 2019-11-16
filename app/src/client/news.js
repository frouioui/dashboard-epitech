import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9002"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

async function getNewsKeyword(params) {
    var keyword = "";
    await params.forEach(param => {
        if (param.name === "Keyword") {
            keyword = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/news/search?q=' + keyword + '&lang=en').then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

async function getHeadlines(params) {
    var keyword = "";
    await params.forEach(param => {
        if (param.name === "Keyword") {
            keyword = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/news/headlines?q=' + keyword + '&lang=en').then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

async function getHeadlinesCountry(params) {
    var country = "";
    await params.forEach(param => {
        if (param.name === "country") {
            country = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/news/headlines/country?country=' + country + '&lang=en').then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getNewsKeyword,
    getHeadlines,
    getHeadlinesCountry
}