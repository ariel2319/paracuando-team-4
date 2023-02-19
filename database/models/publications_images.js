'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PublicationsImages extends Model {
    static associate(models) {

      PublicationsImages.belongsTo(models.Publications, {
        as: 'publications',
        foreignKey: 'publication_type_id',
      })
    }
  }
  PublicationsImages.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      image_url: DataTypes.STRING,
      order: DataTypes.INTEGER,
      publication_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'PublicationsImages',
      tableName: 'publications_images',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: { attributes: ['id','image_url' ,'order', 'publication_id'] },
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] },
      },
    },
  )
  return PublicationsImages
}
