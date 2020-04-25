const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(' ');
    const token = auth[1];
    console.log(token);
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.log(err);
    res.send('not authenticated wrong JWT token');
  }
};

module.exports = checkToken;
