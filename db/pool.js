const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    port: process.env.DB_PORT || 5432, // Use DB_PORT for the database
    ssl: {
        rejectUnauthorized: false,
    },
});
module.exports = pool;