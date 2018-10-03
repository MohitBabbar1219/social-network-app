const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Route files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

mongoose.connect(db)
    .then(() => console.log('succesfully connected to database...'))
    .catch(() => console.log('error occurred while connecting to database'));

app.use(passport.initialize());
// app.use();
require('./services/passport')(passport);


app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));