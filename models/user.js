const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScehma = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: String,
    password: { type: String, required: true, minlength: 60, maxlength: 60 },
    portfolios: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
      },
    ],
  },
  {
    timestamps: true,
    autoIndex: false,
  }
);

const User = mongoose.model('User', userScehma);

module.exports = User;
