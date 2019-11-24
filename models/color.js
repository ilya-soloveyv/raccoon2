'use strict';
module.exports = (sequelize, DataTypes) => {
  const colors = sequelize.define('colors', {
    iColorID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sColorTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'colors'
  });
  colors.associate = function(models) {
    colors.hasMany(models.color_color_schemes, {
      foreignKey: 'iColorID'
    })
  };
  return colors;
};
