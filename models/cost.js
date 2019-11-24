'use strict';
module.exports = (sequelize, DataTypes) => {
  const costs = sequelize.define('costs', {
    iCostID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    iCostFrom: { type: DataTypes.INTEGER, allowNull: true },
    iCostTo: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    timestamps: false,
    tableName: 'costs'
  });
  costs.associate = function(models) {
    // associations can be defined here
  };
  return costs;
};