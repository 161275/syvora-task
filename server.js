const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => res.send('Node.js CRUD API with PostgreSQL'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
