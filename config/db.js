const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

exports.connect = () => {
  mongoose.connect('mongodb://localhost/sofit').then(() => {
    console.log('databsae is connected');
  });
};
