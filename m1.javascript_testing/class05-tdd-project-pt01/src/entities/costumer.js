const BaseEntity = require('./base.entity')

class Costumer extends BaseEntity {
  constructor({id, name, age}){
    super({id, name})

    this.age = age
  }
}

module.exports = Costumer