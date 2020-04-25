const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const login = async (req, res) => {
  const auth = req.headers.authorization;
  const base64String = auth.split(' ')[1];
  const credentials = Buffer.from(base64String, 'base64').toString('ascii');
  const username = credentials.split(':')[0];
  const password = credentials.split(':')[1];

  try {
    const userFetched = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, userFetched.password);
    console.log(userFetched);

    if (isMatch) {
      const token = jwt.sign({ _id: userFetched._id }, process.env.JWT_SECRET);
      res.send(token);
    } else {
      res.send('Password is incorrect');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('User is not found');
  }
};

const indexUser = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createUser = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    portfolio: [],
  });
  try {
    await newUser.save();
    res.send('ok');
  } catch (err) {
    res.status(400).send(err);
  }
};

const showUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

// requires body object as such: {active: false}
const updateUser = async (req, res) => {
  try {
    const newUser = await User.findById(req.params.id);
    const data = req.body;
    for (key in data) {
      console.log(
        `User ${key} is ${newUser[key]}, which now becomes ${data[key]}`
      );
      newUser[key] = data[key];
      await User.updateOne({ _id: newUser._id }, newUser);
    }
    res.send(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
};

const destroyUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send('User has been destroyed.');
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  indexUser,
  createUser,
  showUser,
  updateUser,
  destroyUser,
  login,
};
