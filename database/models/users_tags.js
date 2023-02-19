'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UsersTags extends Model {
    static associate(models) {
      UsersTags.belongsTo(models.Tags, { as: 'tags', foreignKey: 'tag_id' })
      UsersTags.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
   
    }
  }
  UsersTags.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tag_id: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
    
    },
    {
      sequelize,
      modelName: 'UsersTags',
      tableName: 'users_tags',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: {
          attributes: ['id', 'tag_id', 'user_id'],
        },
        no_timestamps: {
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      },
    },
  )
  return UsersTags
}
