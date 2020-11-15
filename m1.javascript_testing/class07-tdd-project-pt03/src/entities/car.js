const BaseEntity = require('./base.entity')

class Car extends BaseEntity {
  constructor({id, name, releaseYear, available, gasAvailable}){
    super({id, name})

    this.releaseYear = releaseYear
    this.available = available
    this.gasAvailable = gasAvailable
  }
}

module.exports = Car