const bcrypt = require('bcryptjs');

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const comparePasword = (input, psswrdDB) => {
    return bcrypt.compareSync(input, psswrdDB)
}

module.exports = {hash, comparePasword}