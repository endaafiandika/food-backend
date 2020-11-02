const Pool = require('pg-pool')

const db = new Pool({
    user : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASS,
    host : process.env.DB_HOST,
})

module.exports = db