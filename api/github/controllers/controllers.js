var model = require('../models/models')


module.exports = {
    getRepoLastIssue,
    getRepoLastPull
}

function getRepoLastIssue(req, res) {
    res.set('Content-Type', 'application/json');

    let repo = req.params.repo
    let owner = req.params.owner
    let auth = req.get('Authorization')

    model.getLastIssueOfRepo(auth, owner, repo).then(function (json) {
        var data = {}
        if (json.length > 0) {
            data.name = json[0].title
            data.url = json[0].html_url
            data.number = json[0].number
        }
        res.status(200).json({ status: 'success', code: 200, data: data })
    }).catch((err) => setImmediate(() => {
        console.log(err)
        res.status(400).json({ status: 'failure', code: 400, error: err })
    }))
    return
}

function getRepoLastPull(req, res) {
    res.set('Content-Type', 'application/json');

    let repo = req.params.repo
    let owner = req.params.owner
    let auth = req.get('Authorization')

    model.getLastPullOfRepo(auth, owner, repo).then(function (json) {
        var data = {}
        if (json.length > 0) {
            data.name = json[0].title
            data.url = json[0].url
            data.number = json[0].number
        }
        res.status(200).json({ status: 'success', code: 200, data: data })
    }).catch((err) => setImmediate(() => {
        console.log(err)
        res.status(400).json({ status: 'failure', code: 400, error: err })
    }))
    return
}