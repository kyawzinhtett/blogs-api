const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/blogs', require('./routes/blog'));

app.use(notFound);

app.listen(port, () => console.log(`Server listing on port ${port}`));
