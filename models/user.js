const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScehma = new Schema(
  {
    username: String,
    email: String,
    password: String,
    portfolios: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userScehma);

module.exports = User;
