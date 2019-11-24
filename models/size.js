'use strict';
module.exports = (sequelize, DataTypes) => {
  const sizes = sequelize.define('sizes', {
    iSizeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sSizeTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'sizes'
  });
  sizes.associate = function(models) {
    // associations can be defined here
  };
  return sizes;
};