'use strict';

module.exports = (sequelize, DataTypes) => {
  const bouquets = sequelize.define('bouquets', {
    iBouquetID: { allowNull: false, type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sBouquetTitle: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'bouquets'
  });
  bouquets.associate = function(models) {
    bouquets.hasMany(models.bouquet_sizes, {
      foreignKey: 'iBouquetID'
    })
  };

  bouquets.getBouquets = async function () {
    let bouquets = await bouquets.findAll()
    return bouquets
  }

  bouquets.getBouquet = async function (iBouquetID) {
    let bouquet = await bouquets.findByPk(iBouquetID, {
      include: [
        {
          model: sequelize.models.bouquet_sizes,
          include: [
            {
              model: sequelize.models.bouquet_flowers
            }
          ]
        }
      ]
    })
    return bouquet
  }

  bouquets.getBouquetCatalog = async function (query) {
    let responce = {}

    let where_flowers = null
    if (query.flowers) {
      where_flowers = {
        iFlowerID: query.flowers
      }
    }
  
    let where_color_schemes = null
    if (query.color_schemes) {
      where_color_schemes = {
        iColorSchemeID: query.color_schemes
      }
    }
  
    let where_colors = null
    if (query.colors) {
      where_colors = {
        iColorID: query.colors
      }
    }
  
    let where_bouquet_size = []
    if (query.sizes) {
      where_bouquet_size.push({
        iSizeID: query.sizes
      })
    }
    if (query.costs) {

      let costs = await sequelize.models.costs.findAll({
        raw: true,
        order: [
          ['iCostFrom', 'ASC']
        ]
      })

      const Sequelize = require('sequelize');
      const Op = Sequelize.Op;
      // let Op = sequelize.Op

      let cost = costs.filter(cost => cost.iCostID == query.costs)
      if (cost[0].iCostFrom) {
        where_bouquet_size.push({
          iCost: {
            [Op.gte]: cost[0].iCostFrom
          }
        })
      }
      if (cost[0].iCostTo) {
        where_bouquet_size.push({
          iCost: {
            [Op.lte]: cost[0].iCostTo
          }
        })
      }
    }
  

    // if (query.page) {
    //   if (Number.isInteger(query.page)) {
    //     responce.bouquets.page = (query.page) ? Number(query.page) : 1
    //   } else {

    //   }
    // }

    // let page = query.page
    responce.limit = (query.limit) ? Number(query.limit) : 3
    let limit = responce.limit
    let offset = 0

    if (query.page) {
      let page = query.page.split('-')
      if (Number(page[0]) && Number(page[1])) {
        offset = page[0] * limit - limit
        limit = ( page[1] - page[0] ) * limit + limit
        responce.page = page[0] + '-' + page[1]
      } else if (Number(page[0])) {
        offset = responce.limit * ( page[0] - 1 )
        responce.page = Number(page[0])
      } else {
        responce.page = 1
      }
    } else {
      responce.page = 1
    }

    responce.limit = limit

    let list = await bouquets.findAndCountAll({
      attributes: ['iBouquetID', 'sBouquetTitle'],
      offset: offset,
      limit: limit,
      include: [
        {
          attributes: [],
          model: sequelize.models.bouquet_sizes,
          where: where_bouquet_size,
          required: true,
          include: [
            {
              attributes: [],
              model: sequelize.models.sizes,
            },
            {
              attributes: [],
              model: sequelize.models.bouquet_flowers,
              where: where_flowers,
              required: true,
              include: [
                {
                  attributes: [],
                  model: sequelize.models.flowers
                },
                {
                  attributes: [],
                  model: sequelize.models.colors,
                  where: where_colors,
                  required: true,
                  include: [
                    {
                      attributes: [],
                      model: sequelize.models.color_color_schemes,
                      where: where_color_schemes,
                    }
                  ]
                }
              ]
            },
          ],
        }
      ],
      order: [
        ['iBouquetID', 'ASC']
        // [Bouquet_size, 'iCost', 'ASC']
      ],
      group: 'bouquets.iBouquetID',
      subQuery: false
    })

    responce.total = list.count.length
    const pluralize = require('numeralize-ru').pluralize
    responce.totalString = pluralize(responce.total, 'букетов', 'букета', 'букетов')
    let limitCheck = (responce.total < responce.limit) ? responce.total : responce.limit
    console.log(limitCheck)
    responce.limitString = pluralize(limitCheck, 'букет', 'букета', 'букетов')
    

    responce.pages = Math.ceil(responce.total / responce.limit)
    responce.docs = list.rows
  
    return responce
  }

  return bouquets;
};