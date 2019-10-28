module.exports = {
    home
}

function home(req, res) {
    var dev = process.env.DEV_ENV == "TRUE"
    res.set('Content-Type', 'application/json');
    res.status(200).json({ status: 'success', code: 200, updated: "October 28th 08:08", dev: dev })
    return
}