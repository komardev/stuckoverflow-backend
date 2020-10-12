const mysql = require('mysql')
const {
    user,
    password,
    host,
    database,
    db_port
} = require('../config/config')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        user: user,
        password: password,
        host: host,
        database: database,
        port: db_port
    }
});

module.exports = knex