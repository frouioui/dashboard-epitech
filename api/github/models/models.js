const Octokit = require("@octokit/rest");

module.exports = {
    getLastIssueOfRepo,
    getLastPullOfRepo
}

function getLastIssueOfRepo(auth, owner, repo) {
    const clientWithAuth = new Octokit({
        auth: "token " + auth
    });

    return new Promise(function (resolve, reject) {
        clientWithAuth.issues.listForRepo({ owner: owner, repo: repo }).then(res => {
            return resolve(res.data)
        }).catch((err) => setImmediate(() => {
            console.log(err)
            return reject(err)
        }))
    })
}

function getLastPullOfRepo(auth, owner, repo) {
    const clientWithAuth = new Octokit({
        auth: "token " + auth
    });

    return new Promise(function (resolve, reject) {
        clientWithAuth.pulls.list({ owner: owner, repo: repo }).then(res => {
            return resolve(res.data)
        }).catch((err) => setImmediate(() => {
            console.log(err)
            return reject(err)
        }))
    })
}
