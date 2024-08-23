const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // tu usuario de MySQL
  password: '1234', // tu contraseña de MySQL
  database: 'usuarios_db' // nombre de tu base de datos
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
