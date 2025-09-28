const express = require('express');
const router = express.Router();
const pool = require('../db');

// CREATE
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  res.json(result.rows[0]);
});

// READ ALL
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.json({ message: 'User deleted' });
});

module.exports = router;
