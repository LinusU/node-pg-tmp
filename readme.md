# pg_tmp for Node

[pg_tmp](http://ephemeralpg.org) packaged for Node.js.

## Installation

```sh
npm install --save pg-tmp
```

## Usage

Example usage together with [mocha](https://mochajs.org):

```js
const createDatabase = require('pg-tmp')
const { Client } = require('pg')

describe('My app', () => {
  before(() => createDatabase())

  it('should access the datbase', () => {
    const client = new Client()

    return client.query('SELECT 1 AS n').then((result) => {
      console.log(result.rows[0].n)
      //=> 1
    })
  })
})
```

## API

### `createDatabase([options]) => Promise`

Start a temporary database that will be cleaned up automatically after being used.

Returns a `Promise` of a object with the following properties:

- `host` - The host to connect to, will be the path to a UNIX socket
- `user` - The user to connect as, currently the name of the current user
- `password` - The password to connect with, currently always an empty string
- `database` - The database to connect to, currently always "test"

#### `options.setEnvironment`

If `setEnvironment` is either not provided, or set to true, the standard [postgresql environmental variables](https://www.postgresql.org/docs/9.1/static/libpq-envars.html) will be set so that you can connect directly without any additional config.

#### `options.timeout`

The database will be shut down and removed after the specified timeout (in seconds). If one or more clients are still connected then sleeps and retries again after the same interval.

The default is 60 seconds.
