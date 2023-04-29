const mongoose = require('mongoose')

if (!mongoose.models['train']) {
  const trainSchema = new mongoose.Schema({
    trainName: {
      type: String,
      required: true
    },
    trainNumber: {
      type: String,
      required: true
    },
    departureTime: {
      type: {
        Hours: Number,
        Minutes: Number,
        Seconds: Number
      },
      required: true
    },
    seatsAvailable: {
      type: {
        sleeper: Number,
        AC: Number
      },
      required: true
    },
    price: {
      type: {
        sleeper: Number,
        AC: Number
      },
      required: true
    },
    delayedBy: {
      type: Number,
      required: true
    }
  });

  module.exports = mongoose.model('train', trainSchema)
} else {
  module.exports = mongoose.model('train')
}