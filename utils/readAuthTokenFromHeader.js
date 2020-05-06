const jwt = require('jsonwebtoken');

const readAuthTokenFromHeader = (req, res, next) => {
  console.log('is readAuthTokenFromHeader called?');
  const authToken = req.header('x-auth-token');
  if (!authToken)
    return res.status(401).json({ msg: 'No authToken, authorization denied' });
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    res.locals.decoded = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'authToken is not valid' });
  }
};

module.exports = readAuthTokenFromHeader;

// export default (req, res, next) => {
//   const token = req.header('x-auth-token');

//   // Check for token
//   if (!token)
//     return res.status(401).json({ msg: 'No token, authorizaton denied' });

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // Add user from payload
//     req.user = decoded;
//     next();
//   } catch (e) {
//
//   }
// };
