require('dotenv').config()
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME_DEV,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME_DEV,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME_DEV,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
