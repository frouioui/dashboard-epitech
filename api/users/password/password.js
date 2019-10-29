const bcrypt = require('bcrypt');

module.exports = {
    hashPassword,
    comparePassword
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10) // TODO: replace salt by actual secret from environment
}

function comparePassword(password, hash) {
    if (bcrypt.compareSync(password, hash)) {
        return true
    }
    return false
}
