const respon = require('../helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require('jwt-decode')


const checkToken = (req, res, next) => {
    const {token} = req.headers

    if (!token) {
        const result = {
            msg : "Login dulu"
        }
        return respon(res, 401, result)
    }
    const jwtToken = jwtDecode(token) 
    const userRole = jwtToken.hak
    console.log(userRole)

    jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            return respon(res, 401, err)
            } 
        if (userRole !== "Admin") {
            const result = {
                msg : "Anda Bukan Admin"
            } 
            return respon(res, 401, result)
        } 
        next()
    })
}

module.exports = checkToken