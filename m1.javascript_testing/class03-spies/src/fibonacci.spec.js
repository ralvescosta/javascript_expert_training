const sinon = require('sinon')
const {deepStrictEqual} = require('assert')

const Fibonacci = require('./fibonacci')

;(async ()=> {
  

  {
    const sut = new Fibonacci()
    const spy = sinon.spy(sut, sut.execute.name)
    for await(const i of sut.execute(3)){}
    
    const expectedCallCount = 4
    deepStrictEqual(spy.callCount, expectedCallCount)
  }
  {
    const sut = new Fibonacci()
    const spy = sinon.spy(sut, sut.execute.name)
    const [...results] = sut.execute(5)

    const {args} = spy.getCall(2)

    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })
    
    deepStrictEqual(args, expectedParams)
    deepStrictEqual(results, expectedResult)

  }
})()