'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    static associate(models) {
      Publications.belongsTo(models.PublicationsTypes, { as: 'publications_types', foreignKey: 'publication_type_id' })
      Publications.hasMany(models.Votes, { as: 'votes', foreignKey: 'publication_id' })
      Publications.hasMany(models.PublicationsImages, { as: 'publications_images', foreignKey: 'publication_id' })
      Publications.belongsTo(models.Cities, { as: 'cities', foreignKey: 'city_id' })
      Publications.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
      Publications.hasMany(models.PublicationsTags, { as: 'publications_tags', foreignKey: 'publication_id' })
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content: {
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
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: { attributes: ['id', 'user_id','publication_type_id','city_id','title','description','content'] }
    },
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    },
  });
  return Publications;
};