const express = require("express")
const controller = require('../controller/history')
const routes = express.Router()

routes.get("/", controller.all)
routes.post("/", controller.add)
routes.put("/", controller.Edit)
routes.delete("/", controller.delete)

module.exports = routes