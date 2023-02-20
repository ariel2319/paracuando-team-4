const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')
const { hashPassword } = require('../libs/bcrypt')

class TagsService {
  constructor() {}

  async addTagsById(id) {
 
 
    const Tags = await models.Tags.create(options)
    if (!Tags) throw new CustomError('Not found Tags', 404, 'Not Found')

    return Tags
  }
  
}

module.exports = TagsService
