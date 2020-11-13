class User {
  constructor({id, name, profession, age}) {
    this.id = parseInt(id, 10)
    this.name = name
    this.profession = profession
    this.age = parseInt(age, 10)
  }
}

module.exports = User