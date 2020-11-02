const redis = require('redis')
const respon = require('../helper/respon')

class Redis{
        constructor() {
            this.redisdb = redis.createClient({
                host : process.env.REDIS_HOST,
                port : process.env.REDIS_PORT,
                password : process.env.REDIS_PASS,
        })
    }

    redisCheck() {
        return new Promise((resolve, reject) => {
            this.redisdb.get("product", (err, res) => {
                if (err) {
                    reject("Redis Not Connect")
                }
                if( res == "OK"  || res == null){
                    resolve("Redis Connected")
                }
            })
        })
    }

}

module.exports = new Redis()