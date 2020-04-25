const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioScehma = new Schema(
  {
    name: String,
    description: String,
    investments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Investment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioScehma);

module.exports = Portfolio;
