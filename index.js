const execa = require('execa')
const path = require('path')
const url = require('url')

const bin = path.join(__dirname, 'pg_tmp.sh')

module.exports = function pgTmp (setEnvironment) {
  setEnvironment = (setEnvironment == null ? true : setEnvironment)

  return execa.stdout(bin).then((connection) => {
    const parsed = url.parse(connection, true)

    const result = {
      host: parsed.query.host,
      user: process.env.USER,
      password: '',
      database: parsed.pathname.replace(/^\//, '')
    }

    if (setEnvironment) {
      process.env.PGHOST = result.host
      process.env.PGUSER = result.user
      process.env.PGPASSWORD = result.password
      process.env.PGDATABASE = result.database
    }

    return result
  })
}
