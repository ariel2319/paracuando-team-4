const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
const sender = require('../libs/nodemailer')
const VotesService = require('../services/votes.service')
const PublicationsService = require('../services/publications.service')
const UsersTagsService = require('../services/users.tags.service')
const TagsService = require('../services/tags.service')
require('dotenv').config()

const authService = new AuthService()
const usersService = new UsersService()
const votesService = new VotesService()
const publicationsService = new PublicationsService()
const usersTagsService = new UsersTagsService()
const tagsService = new TagsService()

const getUserById = async (request, response, next) => {
  try {
    const { id } = request.params
    const { isAdminUserVar, isSameUserVar } = request
    if (isAdminUserVar) {
      let user = await usersService.getUserWithScope(id, 'view_same_user')
      return response.json({ results: user })
    } else {
      let user = await usersService.getUserWithScope(id, 'view_public')
      return response.json({ results: user })
    }
  } catch (error) {
    next(error)
  }
}

const getUsers = async (request, response, next) => {
  try {
    const query = request.query
    let user = await usersService.findAndCountWithQuery(query)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const putUserById = async (request, response, next) => {
  try {
    const { id } = request.params
    const obj = {
      first_name: request.body.firstName,
      last_name: request.body.lastName,
      // email: request.body.email,
      // username: request.body.username,
      // password: request.body.password,
      // email_verified: request.body.email_verified,
      // token: request.body.token,
      code_phone: request.body.code_phone,
      phone: request.body.phone,
      country_id: request.body.countryId,
      image_url: request.body.image_url,
    }
    const { isSameUserVar } = request
    if (isSameUserVar) {
      let result = await usersService.updateUser(id, obj)
      return response.json({ message: 'Succes Update' })
    } else {
      return response.json({ message: 'Is not the same user' })
    }
  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    // let user = await usersService.getUser(id)
    return response.json({ results: 'result' })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    const { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getVotesById = async (request, response, next) => {
  try {
    const { id } = request.params
    let votesByUser = await votesService.getVotesByUserId(id)
    return response.json({ results: votesByUser })
  } catch (error) {
    next(error)
  }
}

const getPublicationsByUserId = async (request, response, next) => {
  try {
    const { id } = request.params

    let publicationsByUser = await publicationsService.getPublicationsByUserId(
      id,
    )
    return response.json({ results: publicationsByUser })
  } catch (error) {
    next(error)
  }
}

const addInterestByTagId = async (request, response, next) => {
  try {
    const { tag_id } = request.body
    const { userIdVar } = request
    let result = await usersTagsService.addUsersTagsById(tag_id, userIdVar)
    if (result) return response.json({ message: 'Interest Added' })
    else return response.json({ error: 'No added interest' })
  } catch (error) {
    next(error)
  }
}

const removeInterestByTagId = async (request, response, next) => {
  try {
    const { tag_id } = request.body
    const { userIdVar } = request
    let result = await usersTagsService.removeUsersTagsById(tag_id, userIdVar)
    if (result) return response.json({ message: 'Interest removed' })
    else return response.json({ error: 'No removed interest' })
  } catch (error) {
    next(error)
  }
}

const addImageByTagId = async (request, response, next) => {
  try {
    const { tag_id } = request.params
    const { image_url } = request.body
    let result = await tagsService.addImageByTagId(tag_id, image_url)
    if (result) return response.json({ message: 'Image Added' })
    else return response.json({ error: 'No Image Added' })
  } catch (error) {
    next(error)
  }
}

const removeImageByTagId = async (request, response, next) => {
  try {
    const { isSameUserVar } = request
    const { isAdminUserVar } = request
    const { userId } = request.params
    const { tag_id } = request.body
    const { image_url } = ''
    let result = ''
    if (isSameUserVar) {
      //check is tag_id is for de user id.
      const userIdInDatabase = await usersTagsService.findUsersTagsById(tag_id)
      if (userIdInDatabase === userId)
        result = await tagsService.removeImageByTagId(tag_id, image_url)
      else
        return response.json({ error: 'No permition for remove another image' })
    }
    if (isAdminUserVar) {
      result = await tagsService.removeImageByTagId(tag_id, image_url)
    }

    if (result) return response.json({ message: 'Image removed' })
    else return response.json({ message: 'Image Not removed' })
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
  getVotesById,
  getPublicationsByUserId,
  addInterestByTagId,
  removeInterestByTagId,
  addImageByTagId,
  removeImageByTagId,
}
