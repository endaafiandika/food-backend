const database = require('../config/databases')
const user = {}

user.Get = () => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM users`)
        .then(res => {
            resolve(res.rows)
        })
        .catch(err => {
            reject(err)
        })
    })
}


user.Add = (data) => {
    return new Promise ((resolve, reject) => {
        database.query(`INSERT INTO users (username, password, status) VALUES ('${data.username}','${data.password}', '${data.status}')`)
        .then (res => {
            resolve(res)
        })
        .catch (err => {
            reject(err)
        })
    })
}


user.getByUser = (user) => {
    console.log(user)
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM users WHERE username = '${user}'`)
            .then((res) => {
                resolve(res.rows)
                console.log(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

user.setToken = (user, token) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE users SET token = '${token}' WHERE username = '${user}'`)
            .then((res) => {
                resolve(`token set in user : ${user}`)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


user.Edit = (id, username, password, token) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE users SET username='${username}', password='${password}', token='${token}' WHERE id=${id} `)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}

user.Delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM users WHERE id=${id} `)
        .then(res => {
            resolve(res)
        })
        .catch(err => {
            reject(err)
        })
    })
}


module.exports = user