// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    db_port: process.env.DATABASE_PORT,
};