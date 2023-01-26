const express = require('express');
const mongoose = require('mongoose');
const file = require('fs');

const { User } = require('./model/user');
const userRouter = require('./routes/user');
const { connect } = require('./config/db');

require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

try {
  connect();
  app.use('/user', userRouter);
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
} catch (err) {
  console.log(err.message);
}
