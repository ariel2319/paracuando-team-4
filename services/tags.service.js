const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')
const { hashPassword } = require('../libs/bcrypt')

class TagsService {
  constructor() {}

  async addTagsById(tag_id, user_id) {
    const Tags = await models.Tags.create({ tag_id, user_id })
    if (!Tags) throw new CustomError('Not found Tags', 404, 'Not Found')
    return Tags
  }

  async removeTagsById(tag_id, user_id) {
    let options = {
      where: {},
    }
    options.where.tag_id = tag_id
    const Tags = await models.Tags.delete(options)
    if (!Tags) throw new CustomError('Not found Tags', 404, 'Not Found')
    return Tags
  }

  async addImageByTagId(tag_id, image_url) {
    let options = {
      where: {},
    }
    options.where.id = tag_id
    const Tags = await models.Tags.create(options, { image_url })
    if (!Tags) throw new CustomError('Not found Tags', 404, 'Not Found')
    return Tags
  }

  async removeImageByTagId(tag_id, image_url) {
    let options = {
      where: {},
    }
    const attributesSelected = ['image_url']
    options.where.id = tag_id
    const Tags = await models.Tags.delete(options, attributesSelected)
    if (!Tags) throw new CustomError('Not found Tags', 404, 'Not Found')
    return Tags
  }
}

module.exports = TagsService
