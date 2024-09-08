const { Pool } = require('pg');

// DATABASE_URL=postgres://postgres:1234@localhost:5432/farmer-porter
const pool = new Pool({
    user: process.env.DB_USER,        // Set in .env file
    host: process.env.DB_HOST,        // Set in .env file
    database: process.env.DB_NAME,    // Set in .env file
    password: process.env.DB_PASSWORD,// Set in .env file
    port: process.env.DB_PORT         // Set in .env file
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

module.exports = pool;
