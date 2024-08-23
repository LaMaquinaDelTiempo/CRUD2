const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./db');


// Permitir solicitudes CORS desde cualquier origen
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para crear un nuevo usuario
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, email });
  });
});

// Ruta para actualizar un usuario
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) throw err;
    res.send('Usuario actualizado');
  });
});

// Ruta para eliminar un usuario
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send('Usuario eliminado');
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
