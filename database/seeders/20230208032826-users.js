'use strict'
const uuid = require('uuid')
const { Op } = require('sequelize')
const { hashPassword } = require('../../libs/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const usersSeeds = [
      {
        id: uuid.v4(),
        first_name: 'Gaston',
        last_name: 'Colque',
        email: 'gaston@academlo.com',
        username: 'gaston@academlo.com',
        password: hashPassword('gaston12345'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        first_name: 'Carlos',
        last_name: 'Bratini',
        email: 'carlos@academlo.com',
        username: 'carlos@acarlosc.com',
        password: hashPassword('carlos12345'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        first_name: 'Ariel',
        last_name: 'Maldonado',
        email: 'ariel@academlo.com',
        username: 'ariel@academlo.com',
        password: hashPassword('ariel12345'),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]

    try {
      await queryInterface.bulkInsert('users', usersSeeds, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = [
      'example@academlo.com',
    ]

    try {
      await queryInterface.bulkDelete(
        'users',
        {
          username: {
            [Op.or]: userNames,
          },
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
