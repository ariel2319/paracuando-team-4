'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    static associate(models) {
      Votes.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'user_id',
      })

      Votes.belongsTo(models.Publications, {
        as: 'publications',
        foreignKey: 'publication_id',
      })
    }
  }
  Votes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      publication_id: DataTypes.UUID, 
    },
    {
      sequelize,
      modelName: 'Votes',
      tableName: 'votes',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ['id', 'user_id', 'publication_id'] },
      },
      // no_timestamps: {
      //   attributes: { exclude: ['created_at', 'updated_at'] },
      // },
    },
  )
  return Votes
}
