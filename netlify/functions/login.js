const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        try {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            const user = result.rows[0];
            
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: 'Login successful', token }),
                };
            } else {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ message: 'Invalid credentials' }),
                };
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error logging in', error: error.message }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
