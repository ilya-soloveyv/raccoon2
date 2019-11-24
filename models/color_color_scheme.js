'use strict';
module.exports = (sequelize, DataTypes) => {
  const color_color_schemes = sequelize.define('color_color_schemes', {
    iColorColorSchemeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iColorSchemeID: { allowNull: false, type: DataTypes.INTEGER },
    iColorID: { allowNull: false, type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    tableName: 'color_color_schemes'
  });
  color_color_schemes.associate = function(models) {
    color_color_schemes.belongsTo(models.colors, {
      foreignKey: 'iColorID'
    })
    color_color_schemes.belongsTo(models.color_schemes, {
      foreignKey: 'iColorSchemeID'
    })
  };
  return color_color_schemes;
};