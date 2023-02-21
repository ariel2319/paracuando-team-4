const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')
const { hashPassword } = require('../libs/bcrypt')

class UsersTagsService {
  constructor() {}

  async addUsersTagsById(tag_id, user_id) {
     const usersTags = await models.UsersTags.create({tag_id,user_id})
    if (!usersTags) throw new CustomError('Not found UsersTags', 404, 'Not Found')
    return usersTags
  }
  
}

module.exports = UsersTagsService
