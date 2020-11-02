const respon = require('../helper/respon')
const jwt = require("jsonwebtoken")
const jwtDecode = require('jwt-decode')
const auth = require('../controller/auth')


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

    jwt.verify(token, process.env.JWT_KEYS, (err, decode) => {
        if (err) {
            console.log('Token Expired but Allowed')
            } 
           
        next()
    })
}

module.exports = checkToken