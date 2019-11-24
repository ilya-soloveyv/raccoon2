'use strict';
module.exports = (sequelize, DataTypes) => {
  const bouquet_sizes = sequelize.define('bouquet_sizes', {
    iBouquetSizeID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iBouquetID: { allowNull: false, type: DataTypes.INTEGER },
    iSizeID: { allowNull: false, type: DataTypes.INTEGER },
    iCost: { allowNull: false, type: DataTypes.INTEGER }
  }, {
    timestamps: false,
    tableName: 'bouquet_sizes'
  });
  bouquet_sizes.associate = function(models) {
    bouquet_sizes.hasMany(models.bouquet_flowers, {
      foreignKey: 'iBouquetSizeID'
    })
    bouquet_sizes.belongsTo(models.sizes, {
      foreignKey: 'iSizeID'
    })
  };
  return bouquet_sizes;
};