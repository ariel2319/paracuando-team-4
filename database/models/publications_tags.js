'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PublicationsTags extends Model {
    static associate(models) {
      PublicationsTags.belongsTo(models.Tags, { as: 'tags', foreignKey: 'tag_id' })
      PublicationsTags.belongsTo(models.Publications, {
        as: 'publications',
        foreignKey: 'publication_id',
      })
    }
  }
  PublicationsTags.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tag_id:DataTypes.INTEGER,
      publication_id:DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'PublicationsTags',
      tableName: 'publications_tags',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: {
          attributes: ['id', 'tag_id', 'publication_id'],
        },
        no_timestamps: {
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      },
    },
  )
  return PublicationsTags
}
