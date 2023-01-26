const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { on } = require('events');
const multer = require('multer');
const { User } = require('../model/user');
const csv = require('csv-parser');
const {
  createUser,
  updateUser,
  getUser,
  getByPhoneNo,
  sendMail,
} = require('../services/userservices');
const userRouter = express.Router();
userRouter.use(bodyparser.urlencoded({ extended: true }));
userRouter.use(express.static(path.resolve(__dirname, 'uploads')));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
// let result = [];
// function readCSV() {
//   fs.createReadStream('./file.csv')
//     .pipe(csv({ delimiter: ',', from_line: 2 }))
//     .on('data', function (row) {
//       console.log(row);
//       result.push(row);
//       console.log('.....', result);
//     })
//     .on('end', function () {
//       console.log('finished');
//     })
//     .on('error', function (error) {
//       console.log(error.message);
//     });
// }
// readCSV();

userRouter.post('/api/addrecords', async (req, res) => {
  try {
    const { body } = req;
    const response = await createUser(body);
    return res
      .status(201)
      .json({ status: 'success', message: 'record added successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  const obj = {
    email: '',
    password: '',
    phoneNo: '',
  };
  validateUser(obj);
  function validateUser(obj) {
    if (!obj.email) {
      throw new Error('Email is required');
    }
    if (!obj.name) {
      throw new Error('Name is required');
    }
    if (!obj.phoneNo) {
      throw new Error('phone No is required');
    }
  }
});
userRouter.get('/api/getbyphoneNo/:phoneNo', async (req, res) => {
  try {
    const { phoneNo } = req.params;
    const { page, limit } = req.query;
    const skip = (page - 1) * 10;
    const response = await getByPhoneNo(phoneNo, page, limit);
    res.send(response);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

userRouter.get('/api/getbyemail/:email', async (req, res) => {
  const email = req.params.email;
  const response = await getUser(email);

  if (response) {
    return res.status(200).json({ response: 'Successfully logged In..' });
  } else {
    return res.status(404).json({ error: 'wrong Request' });
  }
});
userRouter.put('/api/addprofile', upload.single('pic'), async (req, res) => {
  try {
    const email = req.body.email;
    const image = req.file.filename;
    const img = req.file;
    const response = await updateUser(email, image, img);
    return res.status(201).json(response);
  } catch (error) {}
});
userRouter.post('/api/sendmail', async (req, res) => {
  const response = await sendMail();
});
module.exports = userRouter;
