'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class States extends Model {
    static associate(models) {
      States.belongsTo(models.Countries, { as: 'countries', foreignKey: 'country_id' })
      States.hasMany(models.Cities, { as: 'cities', foreignKey: 'state_id' })
    }
  }
  States.init({
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
    
    country_id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'States',
    tableName: 'states',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: { attributes: ['id', 'name', 'country_id'] }
    },
    no_timestamps: {
      attributes: { exclude: ['created_at', 'updated_at'] }
    },
  });
  return States;
};