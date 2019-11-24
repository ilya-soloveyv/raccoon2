'use strict';
module.exports = (sequelize, DataTypes) => {
  const color_schemes = sequelize.define('color_schemes', {
    iColorSchemeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sColorSchemeTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'color_schemes'
  });
  color_schemes.associate = function(models) {
    color_schemes.hasMany(models.color_color_schemes, {
      foreignKey: 'iColorSchemeID'
    })
  };
  return color_schemes;
};