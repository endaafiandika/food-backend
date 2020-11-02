const database = require('../config/databases')
const history = {}

    history.GetAll = () => {
        return new Promise((resolve, reject) => {
            database.query("SELECT * FROM history")
            .then(res => {
                resolve(res.rows)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    history.Add = (invoice, cashier, order_history, amount) => {
        return new Promise((resolve, reject) => {
            database.query(`INSERT INTO history (invoice, cashier, order_history, amount) VALUES ('${invoice}',${cashier}, ${order_history}, ${amount})`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    history.Edit = (invoice, cashier, order_history, amount) => {
        database.query(`UPDATE history SET invoice=${invoice}, cashier='${cashier}', order_history=${order_history}, amount=${amount} WHERE id_history = ${id_history}`)
        .then(res => {
            return res
        })
        .catch (err => {
            return err
        })
    }

    history.Delete = (id_history) => {
        database.query(`DELETE FROM public.history WHERE id_history = ${id_history}`)
        .then(res => {
            return res
        })
        .catch (err => {
            return err
        })
    }

module.exports = history
