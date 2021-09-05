const jwt = require('jsonwebtoken')


const generateAdminToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECERET_ADMIN, {
        expiresIn:'1d',
    });
}



const generateUserToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECERET_USER, {
        expiresIn: '1d',
    });
}

module.exports = { generateUserToken, generateAdminToken};