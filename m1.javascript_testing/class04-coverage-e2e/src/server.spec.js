const {describe, it} = require('mocha')
const request = require('supertest')
const assert = require('assert')

const server = require('./server')

describe('Api Suite Test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(server)
                    .get('/contact')
                    .expect(200)
      
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/contact', () => {
    it('should request and inexistent route /hi and redirect to /hello', async () => {
      const response = await request(server)
                    .get('/hi')
                    .expect(200)
      
      assert.deepStrictEqual(response.text, 'Hello World')
    })
  })

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(server)
                    .post('/login')
                    .send({username: 'username', password: '123456'})
                    .expect(200)
      
      assert.deepStrictEqual(response.text, 'Logging has succeeded!')
    })

    it('should login Failed on the login route and return HTTP Status 401', async () => {
      const response = await request(server)
                    .post('/login')
                    .send({username: 'username', password: '55'})
                    .expect(401)
      
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging Failed!')
    })
  })
})  