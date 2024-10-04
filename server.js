// imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

// port
const PORT = process.env.port || 5000;

// App
const app = express();

// url encoded
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});