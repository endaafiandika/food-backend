const express = require('express')
const controller = require('../controller/category')
const routes = express.Router()

routes.get("/", controller.all)
routes.post("/", controller.add)
routes.put("/", controller.edit)
routes.delete("/", controller.delete)

module.exports = routes