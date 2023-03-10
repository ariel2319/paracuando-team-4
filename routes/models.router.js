const express = require('express')
const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
// const adminProtectedHandler= require("../middlewares/admin.protected.handler")


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use("/users",routesUsers)

}

module.exports = routerModels
