module.exports = {
    home
}

function home(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).json({ status: 'success', code: 200, updated: "October 28th 08:08" })
    return
}