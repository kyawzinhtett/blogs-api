const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/blogs', require('./routes/blog'));

app.listen(port, () => console.log(`Server listing on port ${port}`));
