const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { parse } = require('querystring');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const corsHandler = cors({ origin: '*' });

exports.handler = async function(event, context) {
    await new Promise((resolve, reject) => corsHandler(event, context, (result) => result ? resolve() : reject()));
    
    if (event.httpMethod === 'POST') {
        const { username, password } = JSON.parse(event.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
            return {
                statusCode: 201,
                body: JSON.stringify({ message: 'Signup successful' }),
            };
        } catch (error) {
            return {
                statusCode: error.code === '23505' ? 409 : 500,
                body: JSON.stringify({ message: error.code === '23505' ? 'Username already exists' : 'Error signing up', error: error.message }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
