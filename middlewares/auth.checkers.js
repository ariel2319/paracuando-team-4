const UsersService = require('../services/users.service')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const usersService = new UsersService()

const isAnyRoleByList = (role) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      const token = authorization.replace('Bearer ', '')
      const userFinded = await usersService.verifyUserByToken(token)
      const userToCkeckAdmin = userFinded.profiles[0].roles.name

      if (userToCkeckAdmin === role[0]) {
        next()
      } else {
        res.json({ messge: 'Not Admin User' })
      }
    } catch (error) {
      next(error)
    }
  }
}

const isAdminOrSameUser = async (req, res, next) => {
  try {
    const resultLogin = passport.authenticate('jwt', { session: false })
    if (!resultLogin) res.json({ messge: 'Not User in database' }) // is logged
    let isAdminOrSameUserVar = false
    const { authorization } = req.headers
    const token = authorization.replace('Bearer ', '')
    const userFinded = await usersService.verifyUserByToken(token)
    const userToCkeckAdmin = userFinded.profiles[0].roles.name
    const userToCkeckToken = userFinded.token
    if (userToCkeckAdmin === 'admin' || userToCkeckToken === token) {
      req.isAdminOrSameUserVar = true
      next()
    } else {
      req.isAdminOrSameUserVar = false
      next()
    }

  } catch (error) {
    next(error)
  }
}

const isTheSameUser = async(req, res, next) => {
  try {
    const {id}=req.params
    const resultLogin = passport.authenticate('jwt', { session: false })
    if (!resultLogin) res.json({ messge: 'Not User in database' }) // is logged
    
    const { authorization } = req.headers
    const token = authorization.replace('Bearer ', '')
    const userFinded = await usersService.verifyUserByToken(token)
    const userIdToCkeck = userFinded.id
    if (userIdToCkeck === id) {
      req.isSameUserVar = true
      req.userIdVar = id
      
      next()
    } else {
      req.isSameUserVar = false
      res.json({ message: 'Is not the Same User'})
    }

  } catch (error) {
    next(error)
  }
}

const isAdminRole = (req, res, next) => {
  try {
    const { username } = req.body
    const result = '1'
    // se pide la consulta al servicio y se detecta si es admin o no .
    // luego se hace next

    if (result) {
      next()
    } else {
      res.json({ message: 'Not Admin User' })
    }
  } catch (error) {
    next(error)
  }
}

const isLogged = (req, res, next) => {
  try {
    const result = passport.authenticate('jwt', { session: false })
    if (result) {
      next()
    } else {
      res.json({ message: 'Not Logged' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  isAnyRoleByList,
  isAdminOrSameUser,
  isTheSameUser,
  isAdminRole,
  isLogged,
}
