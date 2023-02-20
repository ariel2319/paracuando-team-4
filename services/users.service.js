const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers')
const { hashPassword } = require('../libs/bcrypt')

class UsersService {
  constructor() {}

  async findAndCountWithQuery(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { id, first_name, last_name, username, email } = query
    if (id) {
      options.where.id = id
    }
    if (first_name) {
      options.where.first_name = { [Op.iLike]: `%${first_name}%` }
    }
    if (last_name) {
      options.where.last_name = { [Op.iLike]: `%${last_name}%` }
    }
    if (username) {
      options.where.username = { [Op.iLike]: `%${username}%` }
    }
    if (email) {
      options.where.email = { [Op.iLike]: `%${email}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.scope('auth_flow').findAndCountAll({
      options
    })
    return users
  }

  async findAndCount(query) {
    const options = {
      where: {
        id: '',
        name: '',
      },
    }
    const attributesSelected = ['id', 'first_name', 'last_name', 'email']

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { id } = query
    if (id) {
      options.where.id = id
    }

    const { first_name } = query
    if (first_name) {
      options.where.first_name = { [Op.iLike]: `%${first_name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll({
      options,
      attributes: attributesSelected,
      include: {
        model: models.Profiles,
        as: 'profiles',
        attributes: ['role_id'],
        include: { model: models.Roles, as: 'roles', attributes: ['name'] },
      },
    })
    return users
  }

  async createAuthUser(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      obj.id = uuid4()
      obj.password = hashPassword(obj.password)
      let newUser = await models.Users.create(obj, {
        transaction,
        fields: [
          'id',
          'first_name',
          'last_name',
          'password',
          'email',
          'username',
        ],
      })

      let publicRole = await models.Roles.findOne(
        { where: { name: 'public' } },
        { raw: true },
      )

      let newUserProfile = await models.Profiles.create(
        { user_id: newUser.id, role_id: publicRole.id },
        { transaction },
      )

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getAuthUserOr404(id) {
    let user = await models.Users.scope('auth_flow').findByPk(id, { raw: true })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  async getUser(id) {
    let user = await models.Users.findByPk(id)
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }
  async getUserWithScope(id,scope) {
    let user = await models.Users.scope(scope).findByPk(id)
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  async findUserByEmailOr404(email) {
    if (!email) throw new CustomError('Email not given', 400, 'Bad Request')
    let user = await models.Users.findOne({ where: { email } }, { raw: true })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update(obj, { transaction })
      await transaction.commit()
      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({ transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async setTokenUser(id, token) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update({ token }, { transaction })
      await transaction.commit()
      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTokenUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.update({ token: null }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async verifiedTokenUser(id, token, exp) {
    const transaction = await models.sequelize.transaction()
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request')
      if (!token)
        throw new CustomError('Not token provided', 400, 'Bad Request')
      if (!exp) throw new CustomError('Not exp exist', 400, 'Bad Request')

      let user = await models.Users.findOne({
        where: {
          id,
          token,
        },
      })
      if (!user)
        throw new CustomError(
          'The user associated with the token was not found',
          400,
          'Invalid Token',
        )
      if (Date.now() > exp * 1000)
        throw new CustomError(
          'The token has expired, the 15min limit has been exceeded',
          401,
          'Unauthorized',
        )
      await user.update({ token: null }, { transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async verifyUserByToken(token) {
    const transaction = await models.sequelize.transaction()
    try {
      if (!token)
        throw new CustomError('Not token provided', 400, 'Bad Request')
      let user = await models.Users.findOne({
        where: {
          token, 
        }, include: {
            model: models.Profiles,
            as: 'profiles',
            attributes: ['role_id'],
            include: { model: models.Roles, as: 'roles', attributes: ['name'] },
          },
      })
      console.log('user:checked', user)
      if (!user)
        throw new CustomError(
          'The user associated with the token was not found',
          400,
          'Invalid Token',
        )

      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updatePassword(id, newPassword) {
    const transaction = await models.sequelize.transaction()
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request')
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let restoreUser = await user.update(
        { password: hashPassword(newPassword) },
        { transaction },
      )
      await transaction.commit()
      return restoreUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = UsersService
