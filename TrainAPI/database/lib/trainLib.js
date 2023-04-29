const trainModel = require("../models/trainModel");
const { v4: uuidv4 } = require('uuid');

module.exports.save = async function (
    trainName,
    trainNumber,
    departureTime,
    seatsAvailable,
    price,
    delayedBy
) {
  const newTrain = new trainModel({
    trainName,
    trainNumber,
    departureTime,
    seatsAvailable,
    price,
    delayedBy
  });
  return await newTrain.save();
};

module.exports.getAllTrains = async function () {
  return await trainModel.find({});
};

module.exports.getbyTrainid = async function (trainid) {
  return await trainModel.find({ trainid });
};
