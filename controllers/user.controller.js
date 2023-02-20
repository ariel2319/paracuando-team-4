const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
const sender = require('../libs/nodemailer')
require('dotenv').config()

const authService = new AuthService()
const usersService = new UsersService()


const getUserById = async (request, response, next) => {
  try {    
    const {id}=request.params
    let user = await usersService.getUser(id)
    return response.json({results:user})    
  } catch (error) {
    next(error)
  }
}

const getUsers = async (request, response, next) => {
  try {    
    const query=request.query
    console.log(query)
    let user = await usersService.findAndCount(query)
    
    return response.json({results:user})    
  } catch (error) {
    next(error)
  }
}

const putUserById = async (request, response, next) => {
  try {    
    const {id}=request.params
    const obj={
      first_name:request.body.firstName,
      last_name:request.body.lastName,
      email:request.body.email,
      username:request.body.username,
      password: request.body.password,
      email_verified:request.body.email_verified,
      token:request.body.token,
      code_phone:request.body.code_phone,
      phone:request.body.phone,
      country_id:request.body.countryId,
      image_url:request.body.image_url, 
    }
    let result = await usersService.updateUser(id,obj)
    return response.json({message:"user changed",result})    
  } catch (error) {
    next(error)
  }



}

const addUser = async (request, response, next) => {
  try {    
  
    // let user = await usersService.getUser(id)
    return response.json({results:"result"})    
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {    
    const {id}=request.params
    let user = await usersService.removeUser(id)
    return response.json({results:user})    
  } catch (error) {
    next(error)
  }
}


module.exports = {
getUsers,
getUserById,
putUserById,
addUser,
removeUser,
}