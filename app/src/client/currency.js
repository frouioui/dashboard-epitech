import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9005"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

async function getCurrency(params) {
    var from = "";
    var to = "";
    await params.forEach(param => {
        if (param.name == "To currency") {
            to = param.value
        } else if (param.name == "From currency") {
            from = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/currency/convert?to=' + to + '&from=' + from).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

async function getCurrencyTranslation(params) {
    var from = "";
    var to = "";
    var amount = "";
    await params.forEach(param => {
        if (param.name == "To currency") {
            to = param.value
        } else if (param.name == "From currency") {
            from = param.value
        } else if (param.name == "Amount") {
            amount = param.value
        }
    })
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/currency/calcul?to=' + to + '&from=' + from + '&amount=' + amount).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getCurrency,
    getCurrencyTranslation,
}