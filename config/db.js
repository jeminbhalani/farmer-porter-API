const { Pool } = require('pg');

console.log("process.env.DB_PASSWORD",process.env.DB_PASSWORD,process.env.DB_NAME,process.env.PORT);

const envVar ={
DB_USER: "postgres",
DB_HOST: "localhost",
DB_NAME: "farmer-porter",
DB_PASSWORD: "1234",
DB_PORT: "5432",
PORT: "5000",
JWT_SECRET: "supersecret",
JWT_EXPIRES_IN: "30d"
}
// DATABASE_URL=postgres://postgres:1234@localhost:5432/farmer-porter
const pool = new Pool({
    user: envVar.DB_USER,        // Set in .env file
    host: envVar.DB_HOST,        // Set in .env file
    database: envVar.DB_NAME,    // Set in .env file
    password: envVar.DB_PASSWORD,// Set in .env file
    port: envVar.DB_PORT         // Set in .env file
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

module.exports = pool;
