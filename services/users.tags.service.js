const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')
const { hashPassword } = require('../libs/bcrypt')

class UsersTagsService {
  constructor() {}

  async findUsersTagsById(tag_id) {
    const usersTags = await models.UsersTags.findOne({ where:{tag_id}})
    if (!usersTags)
      throw new CustomError('Not found UsersTags', 404, 'Not Found')
    return usersTags
  }



  async addUsersTagsById(tag_id, user_id) {
    const usersTags = await models.UsersTags.create({ tag_id, user_id })
    if (!usersTags)
      throw new CustomError('Not found UsersTags', 404, 'Not Found')
    return usersTags
  }

  async removeUsersTagsById(tag_id, user_id) {
    let options = {
      where: {},
    }
    options.where.tag_id = tag_id
    const usersTags = await models.UsersTags.delete(options)
    if (!usersTags)
      throw new CustomError('Not found UsersTags', 404, 'Not Found')
    return usersTags
  }
}

module.exports = UsersTagsService
