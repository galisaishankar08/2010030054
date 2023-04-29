const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true,
    unique: true
  },
  accessCode: {
    type: String,
    required: true
  },
  clientID: {
    type: String,
    required: true,
    unique: true
  },
  clientSecret: {
    type: String,
    required: true
  }
});

const companyModel = mongoose.model('Company', companySchema);

module.exports = companyModel;
