const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  strict: false,
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter a valid email',
    ],
  },
  phoneNo: {
    type: String,
    required: true,
  },
  empTitle: {
    type: String,
    enum: ['front developer', 'backend developer'],
  },
  status: {
    type: Boolean,
  },
  profile: {
    type: String,
    default: null,
  },
});
exports.User = mongoose.model('users', userSchema);
