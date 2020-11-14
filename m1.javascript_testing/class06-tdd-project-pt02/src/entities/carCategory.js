const BaseEntity = require('./base.entity')

class CarCategory extends BaseEntity {
  constructor({id, name, carIds, price}){
    super({id, name})

    this.carIds = carIds
    this.price = price
  }
}

module.exports = CarCategory