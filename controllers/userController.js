const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const checkPassWord = (rawStrPw, encryptedPw) => {
  return bcrypt.compare(rawStrPw, encryptedPw);
};

const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      throw Error('Required field is missing');
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // before the newUser is created; check whether the username already exists

  try {
    const existentUser = await User.findOne({ username });
    if (existentUser) {
      throw Error('Username exists');
    }

    if (password.length > 20 || password.length < 6) {
      throw Error('Password length must be between 6 and 20');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw Error('Something went wrong with hashing the password');
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      portfolio: [],
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw Error('Something went wrong with saving the new user');
    }

    const authToken = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
    const authData = {
      user: {
        username,
        email,
      },
      authToken,
    };

    res.status(200).json(authData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: err.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = res.locals;
  console.log(email, 'what is the email');
  console.log(password, 'what is the password');

  try {
    if (!password || !email) {
      throw Error('Required field is missing');
    }

    if (password.length > 20 || password.length < 6) {
      throw Error('Password length must be between 6 and 20');
    }

    const userFetched = await User.findOne({ email });
    if (!userFetched) {
      throw Error('User does not exist and please sign up');
    }

    const isMatch = await checkPassWord(password, userFetched.password);
    if (!isMatch) {
      throw Error('Wrong password');
    }

    const authToken = jwt.sign(
      { _id: userFetched._id },
      process.env.JWT_SECRET
    );
    const authData = {
      user: {
        username: userFetched.username,
        email: email,
      },
      authToken,
    };
    res.status(200).json(authData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err.message });
  }
};

const credentialUser = async (req, res) => {
  const { decoded } = res.locals;

  try {
    const userFetched = await User.findOne({ _id: decoded._id });
    if (!userFetched) throw Error('cannot found the user in database');
    const userCredential = {
      username: userFetched.username,
      email: userFetched.email,
    };
    res.status(200).json(userCredential);
  } catch (err) {
    res.status(500).json({ msg: err.message });
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
  credentialUser,
  indexUser,
  createUser,
  showUser,
  updateUser,
  destroyUser,
  signIn,
};
