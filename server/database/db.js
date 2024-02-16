const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'absen',
  connectionLimit: 80 // Adjust as needed
});

module.exports = pool;
