const mysql = require('mysql2/promise');

async function test() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'backend'
    });
    const [rows] = await connection.query('SELECT * FROM schools');
    console.log('ROWS IN DB:', rows);
    process.exit(0);
}
test();
