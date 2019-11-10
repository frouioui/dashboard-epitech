import axios from 'axios';

function getURL() {
    var url = ""
    if (process.env.REACT_APP_DEV_ENV === "TRUE") {
        url = "http://localhost:9003"
    } else {
        url = "https://api.pedafy.com"
    }
    return url
}

async function getGPAAndCredits(params) {
    var cycle = "";
    var auth = "";
    await params.forEach(param => {
        if (param.name == "Cycle") {
            cycle = param.value
        } else if (param.name == "Auth Token") {
            auth = param.value
        }
    })
    console.log(cycle)
    return new Promise(function (resolve, reject) {
        axios.get(getURL() + '/v1/intra/grade/' + cycle, { headers: { 'Authorization': auth } }).then(res => {
            resolve(res)
        }).catch((err) => setImmediate(() => { reject(err) }))
    })
}

export {
    getGPAAndCredits
}