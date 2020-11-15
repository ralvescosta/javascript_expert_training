const {join} = require('path')
const {describe, it, beforeEach, afterEach} = require('mocha')
const {expect} = require('chai')
const sinon = require('sinon')

const CarService = require('../../src/service/carService')
const Transaction = require('../../src/entities/transaction')

const mocks = {
  validCarCategory: require('../mocks/valid.car.category.json'),
  validCar: require('../mocks/valid.car.json'),
  validCostumer: require('../mocks/valid.costumer.json')
}

describe('CarService Suit Tests', ()=> {
  let sut = {}
  let sandbox = {}
  const carsDatabase = join(__dirname, '..', '..', 'database', 'cars.json')

  before(()=> {
    sut = new CarService({
      cars: carsDatabase
    })
  })
  beforeEach(()=> {
    sandbox = sinon.createSandbox()
  })
  afterEach(()=> {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', ()=> {
    const data = [1,2,3,4,5]

    const result = sut.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', ()=> {
    const carCategory = mocks.validCarCategory
    const carInIndex = 0

    sandbox.stub(
      sut,
      sut.getRandomPositionFromArray.name
    ).returns(carInIndex)
    const result = sut.chooseRandomCar(carCategory)
  
    const expected = carCategory.carIds[carInIndex]
    expect(result).to.be.equal(expected)
    expect(sut.getRandomPositionFromArray.calledOnce).to.be.ok
  })

  it('give a carCategory it should return an available car', async ()=> {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandbox.stub(
      sut.carRepository,
      sut.carRepository.find.name
    ).resolves(car)

    sandbox.spy(
      sut,
      sut.chooseRandomCar.name
    )

    const result = await sut.getAvailableCar(carCategory)

    const expected = car
    expect(sut.chooseRandomCar.calledOnce).to.be.ok
    expect(sut.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })

  it('give a carCategory, customer and numberOfDays, it should calculate final amount in real', ()=> {
    const customer = {...mocks.validCostumer, age: 50}
    const carCategory = {...mocks.validCarCategory, price: 37.6}
    const numberOfDays = 5
    const expected = sut.currencyFormat.format(244.40)

    sandbox.stub(sut, "taxesBasedOnAge").get(()=> [{from: 40, to: 50, then: 1.3}])

    const result = sut.calculateFinalPrice(customer, carCategory, numberOfDays)
    expect(result).to.be.deep.equal(expected)
  })

  it('give a customer and a car category it should return a transaction receipt', async ()=> {
    const car = mocks.validCar
    const customer = {...mocks.validCostumer, age: 20}
    const carCategory = {...mocks.validCarCategory, price: 37.6, carIds: [car.id]}
    const numberOfDays = 5
    const dueDate = "10 de novembro de 2020"

    const now = new Date(2020, 10, 5)
    sandbox.useFakeTimers(now.getTime())
    sandbox.stub(sut.carRepository, sut.carRepository.find.name).resolves(car)
    
    const expectedAmount = sut.currencyFormat.format(206.80)
    const expected = new Transaction({customer, car, amount: expectedAmount, dueDate})

    const result = await sut.rent(customer, carCategory, numberOfDays)

    expect(result).to.be.deep.equal(expected)
  })
})