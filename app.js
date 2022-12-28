const express = require('express');
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/blogs', require('./routes/blog'));

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listing on port ${port}`));
