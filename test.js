/* eslint-env mocha */

const createDatabase = require('./')

const pg = require('pg')
const assert = require('assert')

describe('pg-tmp', function () {
  this.slow(2000)

  beforeEach(() => {
    delete process.env.PGHOST
    delete process.env.PGUSER
    delete process.env.PGPASSWORD
    delete process.env.PGDATABASE
  })

  it('should set env by deafult', () => {
    return createDatabase().then(() => {
      assert.notStrictEqual(process.env.PGHOST, undefined, 'PGHOST should be set')
      assert.notStrictEqual(process.env.PGUSER, undefined, 'PGUSER should be set')
      assert.notStrictEqual(process.env.PGPASSWORD, undefined, 'PGPASSWORD should be set')
      assert.notStrictEqual(process.env.PGDATABASE, undefined, 'PGDATABASE should be set')
    })
  })

  it('should respect setEnvironment flag', () => {
    return createDatabase({ setEnvironment: false }).then(() => {
      assert.strictEqual(process.env.PGHOST, undefined, 'PGHOST should not be set')
      assert.strictEqual(process.env.PGUSER, undefined, 'PGUSER should not be set')
      assert.strictEqual(process.env.PGPASSWORD, undefined, 'PGPASSWORD should not be set')
      assert.strictEqual(process.env.PGDATABASE, undefined, 'PGDATABASE should not be set')
    })
  })

  it('should return connection info', () => {
    return createDatabase().then((result) => {
      assert.notStrictEqual(result.host, undefined, 'host should be set')
      assert.notStrictEqual(result.user, undefined, 'user should be set')
      assert.notStrictEqual(result.password, undefined, 'password should be set')
      assert.notStrictEqual(result.database, undefined, 'database should be set')
    })
  })

  it('should allow connections to the database', () => {
    return createDatabase().then(() => {
      const client = new pg.Client()

      return Promise.resolve()
        .then(() => client.connect())
        .then(() => client.query('SELECT 1 AS n'))
        .then((result) => assert.strictEqual(result.rows[0].n, 1))
        .then(() => client.end())
    })
  })
})
