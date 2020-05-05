const jwt = require('jsonwebtoken');

const readTokenFromHeader = (req) => {
  const auth = req.headers.authorization.split(' ');
  const token = auth[1];
  return token;
};

const checkToken = (req, res, next) => {
  try {
    const authToken = readTokenFromHeader(req);
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.authToken = authToken;
    res.locals.decodedPayload = decodedPayload;
    next();
  } catch (err) {
    console.log(err);
    res.send('not authenticated wrong JWT token');
  }
};

module.exports = checkToken;
