const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
const sender = require('../libs/nodemailer')
require('dotenv').config()

const authService = new AuthService()
const usersService = new UsersService()

// const logIn = async (request, response, next) => {
    
//   try {
    
//     const { email, password } = request.body    
//     const user = await authService.checkUsersCredentials(email, password)
    
//     const token = jwt.sign({
//       id: user.id,
//       email: user.email,
//     }, process.env.JWT_SECRET_WORD,
//     { expiresIn: '24h' })

//     return response.status(200).json({
//       message: 'Correct Credentials',
//       token
//     })
//   }
//   catch (error) {
//     next(error)
//   }
// }

// const signUp = async (request, response, next) => {
//   try {
//     let { body } = request;
//     let errors = []
//     let user = await usersService.createAuthUser(body);
//     try {
//       await sender.sendMail({
//         from: process.env.MAIL_SEND,
//         to: user.email,
//         subject: `Success SignUp! ${user.firstName} `,
//         html: `<h1>Welcome to: ${process.env.DOMAIN}`,
//         text: 'Welcome Again!',
//       })
//     } catch (error) {
//       errors.push({errorName:'Error Sending Email', message:'Something went wrong with the Sender Email'})
//     }
//     return response
//       .status(201)
//       .json({
//         results: 'Success Sign Up',
//         errors
//       });
//   } catch (error) {
//     next(error);
//   }
// };


// const forgetPassword = async (request, response, next) => {
//   const { email } = request.body
//   try {
//     let userAndToken = await authService.createRecoveryToken(email)
//     let user = await usersService.setTokenUser(userAndToken.user.id, userAndToken.token)
    
//     try {
//       await sender.sendMail({
//         from: process.env.MAIL_SEND,
//         to: user.email,
//         subject: 'Restore Password',
//         html: `<span>${process.env.PASSWORD_RESET_DOMAIN}api/v1/auth/change-password/${userAndToken.token}</span>`
//       })
//     } catch (error) {
//       throw new CustomError('Error Sending the Recovery email', 500, 'Application Error')
//     }
//     return response.status(200).json({ results: { message: 'Email sended!, check your inbox' } })
//   } catch (error) {
//     next(error)
//   }
// }

// const restorePassword = async (request, response, next) => {
//   const { password } = request.body
//   try {
//     let tokenInfo
//     try {
//       tokenInfo = JSON.parse(atob((request.params.token).split('.')[1]))
//     } catch (error) {
//       throw new CustomError('Something went wrong deserializing the token', 401, 'Unauthorized')
//     }
//     await authService.changePassword(tokenInfo, password, request.params.token)
//     response.status(200).json({results: {message: 'update success'} })
//   } catch (error) {
//     next(error)
//   }
// }

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
    let user = await usersService.getUsers()
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


module.exports = {
getUsers,
getUserById,
putUserById
}