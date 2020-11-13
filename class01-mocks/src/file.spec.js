const File = require('./file')
const {error} = require('./constants')
const { rejects, deepStrictEqual } = require('assert')

;(async ()=> {
  
  {
    const filePath = '../mocks/four.items.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }

  {
    const filePath = '../mocks/empty.file.invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }

  {
    const filePath = '../mocks/invalid.headers.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }

  {
    const filePath = '../mocks/three.items.valid.csv'
    
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "Rafael",
        "profession": "Software Engineer",
        "age": 27
      },
      {
        "id": 124,
        "name": "Mario",
        "profession": "Designer",
        "age": 28
      },
      {
        "id": 142,
        "name": "Jon Due",
        "profession": "Lower",
        "age": 30
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }

})()