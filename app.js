const express = require('express');
require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connectDB');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const authenticateUser = require('./middleware/authentication');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', authenticateUser, blogRouter);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listing on port ${port}`));
