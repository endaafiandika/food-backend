const model = require('../model/product')
const respon = require('../helper/respon')
const redis = require('../config/redis')
const product = {}

product.All = async (req, res) => {
    try {
        const data = await model.GetAll()
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("product", 30, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

product.filter = async (req, res) => {
    try {
        const orderBy = req.query.order
        const data = await model.filter(orderBy)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

product.show = async (req, res) => {
    try {
        const id = req.params.id
        console.log(req.params.id)
        const data = await model.get(id)
        const data_redis = JSON.stringify(data)
        redis.redisdb.setex("product", 30, data_redis)
        return res.status(200).json(data)
    } catch (error) {
        return respon(res, 500, 'Error', error)
    }
}


product.lastupdate = async(req, res) => {
    try {
        const data = await model.Lupdate()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

product.name = async(req, res) => {
    try {
        const data = await model.Name()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

product.price = async(req, res) => {
    try {
        const data = await model.Price()   
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

product.Add = async(req, res) => {
    try {
        if (req.file === undefined){
            console.log(req.file)
            return res.status(500).json("Data Kosong")
        }  
        const datas = {
            nama: req.body.nama,
            harga : req.body.harga,
            stok : req.body.stok,
            images: req.file.path,
        }
        console.log(datas)
        const data = await model.Add(datas)
        return respon(res, 201, datas)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
} 


product.Edit= async (req, res) => {
    try {
        const datas = {
            id: req.body.id,
            nama: req.body.nama,
            harga : req.body.harga,
            stok : req.body.stok,
            images: req.file.path,
        }  
        const data = await model.Edit(datas)
        return respon(res, 201, datas)
    } catch {
        return res.status(500).json("terjadi Error")
    }
} 

product.Delete= async (req, res) => {
    try {
        const id = req.params.id
        const data = model.Delete(id)   
        return res.status(200).json(data)
    } catch {
        return res.status(500).json("terjadi Error")
    }
}

product.Search = async (req, res) => {
    try {
        const name = req.query.nama
        const sensitive = req.query.sensitive
        const data = await model.Search(name, sensitive)
        console.log(data)
        if (data.rowCount > 0) {
            return res.send(data.rows)
        } else {
            return res.send({ success: true, message: "not found." })
        }
    } catch (error) {
        return respon(res, 500, "error" )
    }
}




module.exports = product