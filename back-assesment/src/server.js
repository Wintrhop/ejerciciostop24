require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./db');
const userRoute = require('./api/users/user.routes')

const app = express();
const port = process.env.PORT;
connect();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/auth/local', userRoute);

app.listen(port, () => {
    console.log('Server Running Ok');
  });