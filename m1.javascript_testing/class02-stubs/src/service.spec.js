const sinon = require('sinon')
const {deepStrictEqual} = require('assert')

const Service = require('./service')

const BASE_UTL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_UTL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  aleraan: require('./mocks/alderaan.json')
}

;(async ()=> {
  const sut =  new Service() 

  const stub = sinon.stub(sut, sut.makeRequest.name)
    
  stub
    .withArgs(BASE_UTL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_UTL_2)
    .resolves(mocks.aleraan)


  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    }

    const response = await sut.getPlanets(BASE_UTL_1)
    deepStrictEqual(response, expected)
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    }

    const response = await sut.getPlanets(BASE_UTL_2)
    deepStrictEqual(response, expected)
  }



})()