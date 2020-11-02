const express = require("express")
require ('dotenv/config')
const product = require('./routes/product')
const history = require('./routes/history')
const category = require('./routes/category')
const user = require('./routes/user')
const auth = require('./routes/auth')
const routes = express.Router() 

routes.use("/auth", auth)
routes.use("/api/produk", product)
routes.use("/api/history", history)
routes.use("/api/kategori", category)
routes.use("/api/user", user)

module.exports = routes
