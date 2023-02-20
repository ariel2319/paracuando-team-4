'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicationsTypes extends Model {
    static associate(models) {

      PublicationsTypes.hasMany(models.Publications, { as: 'publications', foreignKey: 'publication_type_id' })
    }
  }
  PublicationsTypes.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    
    
  }, {
    sequelize,
    modelName: 'PublicationsTypes',
    tableName: 'publications_types',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: { attributes: ['id', 'name', 'description'] }
    },
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    },
  });
  return PublicationsTypes;
};