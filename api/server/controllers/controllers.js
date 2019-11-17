var model = require("../models/models")

module.exports = {
    about,

}

function about(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).json(model.getAbout(req, res))
    return
}

