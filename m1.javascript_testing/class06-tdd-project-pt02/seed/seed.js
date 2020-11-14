const faker = require('faker')
const { join } = require('path')
const {writeFile} = require('fs/promises')

const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Costumer = require('../src/entities/costumer')

const AMOUNT = 2

const seederBaseFolder = join(__dirname, "../", "database")


const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.name.firstName(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const costumers = []
for(let i = 0; i <= AMOUNT; i++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  cars.push(car)
  carCategory.carIds.push(car.id)

  const costumer = new Costumer({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    age: faker.random.number({min: 18, max: 50})
  })
  costumers.push(costumer)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('cars.json', cars)
  await write('carCategories.json', [carCategory])
  await write('costumers.json', costumers)

})()