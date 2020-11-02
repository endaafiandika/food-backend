const model = require("../model/user")
const respon = require("../helper/respon")
const bcr = require("bcrypt")
const jwt = require('jsonwebtoken')

class Auth {
login = async(req, res) => {
    try {
        const passDB = await model.getByUser(req.body.username)
        console
        
        if (passDB <= 0 ){
            return respon(res, 200, "Username tidak Ada")
        }

        const passReq  = req.body.password
        const check = await bcr.compare(passReq, passDB[0].password)

        if(check) {
            const result = await this.setToken(passDB[0].status)
            respon(res, 200, result)
        } else {
            respon(res, 200, "gagal Login")
        }

    } catch (error) {
        respon(res, 500, error)
    }
    
}

setToken = async (status) => {
    try {
    const payload = {
        status : status,
    }

    const token =  jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: 7200})
    const refreshToken =  jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: 7200})
    
    const result = {
        token: token,
        refreshToken : refreshToken,
        msg: "Token created, login success",
    }
    console.log(result.msg)
    return result    
    } catch (error) {
        throw error
        
}
    
}


}

module.exports = new Auth()