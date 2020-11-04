const model = require('../model/user')
const hashPassword = require('../helper/hash')
const respon = require('../helper/respon')
const redis = require('../config/redis')

class Users {


         async getAll(req, res) {
            try {
                const result = await model.Get()
                const data_redis = JSON.stringify(result)
                redis.redisdb.setex("user", 60, data_redis)
                return respon(res, 200 , result)
            } catch (error) {
                return res.status(500).json('Terjadi Error')
            }
        }

            async getByUser(req, res) {
            try {
                const result = await model.getByUser(req.query.username)
                console.log(req.query)
                return respone(res, 200, result)
            } catch (error) {
                return respone(res, 500, error)
            }
        }


        async Add(req, res ) {
            try {
                const passHash = await hashPassword(req.body.password)
                const data = {
                    username : req.body.username,
                    password : passHash,
                    status : req.body.status,
                }
                console.log(data)
                const result = await model.Add(data)
                return respon (res, 200, data)
            } catch (error) {
                return res.status(200).json('Gagal Menambahkan')
            }
        }


        async Edit (req, res ) {
            try {
                const {id, username,password,token} = req.body
                console.log(req.body)
                const data = await model.Edit(id,username,password,token)
                return res.status(200).json(data)
            } catch (error) {
                return res.status(200).json('Gagal Menambahkan')
            }
        }

        async Delete (req, res ) {
            try {
                const {id} = req.body
                console.log(req.body)
                const data = await model.Delete(id)
                return res.status(200).json(data)
            } catch (error) {
                return res.status(200).json('Gagal Menambahkan')
            }
        }

}

module.exports = new Users()