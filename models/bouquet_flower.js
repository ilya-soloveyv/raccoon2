'use strict';
module.exports = (sequelize, DataTypes) => {
  const bouquet_flowers = sequelize.define('bouquet_flowers', {
    iBouquetFlowerID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iBouquetSizeID: { allowNull: false, type: DataTypes.INTEGER },
    iFlowerID: { allowNull: false, type: DataTypes.INTEGER },
    iColorID: { allowNull: false, type: DataTypes.INTEGER },
    iCount: { allowNull: false, type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    tableName: 'bouquet_flowers'
  });
  bouquet_flowers.associate = function(models) {
    bouquet_flowers.belongsTo(models.flowers, {
      foreignKey: 'iFlowerID'
    })
    bouquet_flowers.belongsTo(models.colors, {
      foreignKey: 'iColorID'
    })
  };
  return bouquet_flowers;
};