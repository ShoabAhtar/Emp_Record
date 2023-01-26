const { User } = require('../model/user');
const nodemailer = require('nodemailer');
const express = require('express');

require('dotenv').config();
async function createUser(body) {
  try {
    const resp = await User.create(body);
    return resp;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getByPhoneNo(phoneNo, page, limit) {
  try {
    const stNo = phoneNo.slice(0, 4);
    const midNo = phoneNo.slice(4, 8);
    const endNo = phoneNo.slice(8, 11);

    const page1 = page;
    const limit1 = limit;
    const skip = (page - 1) * limit;
    const response = await User.find(
      // {
      // $and: [
      {
        $or: [
          { phoneNo: { $regex: `^${stNo}` } },
          { phoneNo: { $regex: `^${midNo}` } },
          { phoneNo: { $regex: `^${endNo}` } },
        ],
      },
      // { status: true },
      // ],
      // },
      { _id: 0, name: 1, email: 1, empTitle: 1, phoneNo: 1 }
    )

      .skip(skip)
      .limit(limit1);
    return response;
  } catch (error) {
    return error;
  }
}
async function getUser(email) {
  let response = await User.findOne({ $and: [{ email }, { status: true }] });
  return response;
}

async function updateUser(email, image, img) {
  try {
    const profile = image;
    const res = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          profile: image,
        },
      }
    );
    return img.path;
  } catch (error) {
    throw error;
  }
}

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'maud.thompson@ethereal.email',
      pass: 'WND3fdBh78uXGGQjkK',
    },
  });

  // Message object
  let message = {
    from: 'Sender Name <sender@example.com>',
    to: 'Recipient <recipient@example.com>',
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    }
  });
}

module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.getByPhoneNo = getByPhoneNo;
module.exports.sendMail = sendMail;
