const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentScehma = new Schema(
  {
    quote: String,
    exchange: String,
    entryPrice: Number,
    exitPrice: Number,
    realisedPL: Number,
  },
  {
    timestamps: true,
  }
);

const Investment = mongoose.model('Investment', investmentScehma);

module.exports = Investment;
