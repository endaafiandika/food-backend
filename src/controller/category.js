const model = require('../model/category')
const category = {}

    category.all = async (req, res) => {
        try {
            const data = await model.all()
            return res.status(200).json(data) 
        } catch (error) {
            return res.status(500).json('Terjadi Error')
        }
    }

    
    category.add = async (req, res) => {
        try {
            const {name_produk, type} = req.body
            const data = model.add(name_produk, type)
            return res.status(200).json("Data Ditambahkan") 
        } catch (error) {
            return res.status(500).json('Terjadi Error')
        }
    }

    category.edit= async (req, res) => {
        try {
            const {id_kategori, name_produk, type} = req.body
            const data = model.Edit(id_kategori, name_produk, type)
            return res.status(200).json("Data Di edit") 
        } catch (error) {
            return res.status(500).json('Terjadi Error')
        }
    }
    
    category.delete= async (req, res) => {
        try {
            const {id_kategori} = req.body
            const data = model.delete(id_kategori)
            return res.status(200).json("Data Di Hapus") 
        } catch (error) {
            return res.status(500).json('Terjadi Error')
        }
    }
    

module.exports = category