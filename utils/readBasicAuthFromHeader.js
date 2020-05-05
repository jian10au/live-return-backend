const readBasicAuthFromHeader = (req, res, next) => {
  console.log('in middle ware');
  const auth = req.headers.authorization;
  const base64String = auth.split(' ')[1];
  console.log(base64String);
  const credentials = Buffer.from(base64String, 'base64').toString('ascii');
  console.log('what is the credential', credentials);
  const email = credentials.split(':')[0];
  console.log(email, 'email in middle ware');
  const password = credentials.split(':')[1];
  res.locals.email = email;
  res.locals.password = password;
  next();
};

module.exports = readBasicAuthFromHeader;
