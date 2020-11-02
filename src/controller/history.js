const model = require('../model/history')
const history = {}

history.all = async (req, res) => {
    try {
        const data = await model.GetAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

history.add = async (req, res) => {
    try {
        const {invoice, cashier, order_history, amount} = req.body
        console.log(req.body)
        const data = model.Add(invoice, cashier, order_history, amount)
        return res.send("Data Ditambahkan")
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

history.Edit = async (req, res) => {
    try {
    const {id_history, invoice, cashier, order_history, amount} = req.body
    const data = model.Edit(id_history, invoice, cashier, order_history, amount)
        return res.send("Data Diedit")
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}


history.delete= async (req, res) => {
    try {
        const {id_history} = req.body
        const data = model.Delete(id_history)
        return res.send("Data telah Dihapus")
    } catch (error) {
        return res.status(500).json("terjadi Error")
    }
}

module.exports = history