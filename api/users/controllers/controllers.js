var model = require("../models/models")
const passManager = require("../password/password")
var github = require('../client/github')

module.exports = {
    home,
    getAllUsersRoute,
    addNewUserRoute,
    loginUserRoute,
    githubLogin
}

function home(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).json({ status: 'success', code: 200, message: "Users API - Dashboard Epitech - github.com/frouioui/dashboard-epitech" })
    return
}

function githubLogin(req, res) {
    res.set('Content-Type', 'application/json');
    github.accessToken(req.body.code, req.body.secret, req.body.client).then(json => {
        github.getUserInfo(json.data.access_token).then(jsonUser => {
            let login = jsonUser.login
            model.getUserByLogin(req, res, login, (req1, res1, err, resultDb) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
                    return
                } else if (resultDb.length == 0) {
                    model.addNewUserNoPassword(req, res, login, (req2, res2, err2, resultDb2) => {
                        if (err2) {
                            console.log(err2)
                            res.status(500).json({ status: 'failure', code: 500, error: err2 })
                        } else {
                            res.status(200).json({ status: 'success', code: 200, data: { message: "Authenticated", id: resultDb2.insertId, auth: json.data.access_token } })
                        }
                    })
                } else {
                    res.status(200).json({ status: 'success', code: 200, data: { message: "Authenticated", id: resultDb[0].id, auth: json.data.access_token } })
                }
            })
        }).catch((err) => setImmediate(() => {
            console.log(err)
            res.status(500).json({ status: 'failure', code: 500, error: err })
        }))
    }).catch((err) => setImmediate(() => {
        console.log(err)
        res.status(400).json({ status: 'failure', code: 400, error: err })
    }))
}

function getAllUsersRoute(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllUsers(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
}

function addNewUserRoute(req, res) {
    res.set('Content-Type', 'application/json');

    var data = { login: req.body.login, password: passManager.hashPassword(req.body.password) }

    model.addNewUser(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: { message: "Created" } })
        }
    })
}

function loginUserRoute(req, res) {
    res.set('Content-Type', 'application/json');

    var data = { login: req.body.login, password: req.body.password }

    model.getUserByLogin(req, res, data.login, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else if (result.length == 0) {
            console.log("No email found")
            console.log(result)
            res.status(401).json({ status: 'failure', code: 401, data: { message: "No email found" } })
        } else {
            let hash = result[0].password
            if (passManager.comparePassword(data.password, hash) == true) {
                res.status(200).json({ status: 'success', code: 200, data: { message: "Authenticated", id: result[0].id } })
            } else {
                res.status(401).json({ status: 'failure', code: 401, data: { message: "Wrong password" } })
            }
        }
    })
}

