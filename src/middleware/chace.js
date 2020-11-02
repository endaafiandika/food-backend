const respon = require('../helper/respon')
const redis = require('../config/redis')

const getAll = (req,res, next) => {
    
    redis.redisdb.get("user", (err, ress) => {

        if(err) {
            return respon(res, 500, err)
        } 
        if (ress !== null) {
            const data = JSON.parse(ress)
            return respon(res, 200, data)

        } else {
        next()
        }
    })
}

module.exports = getAll