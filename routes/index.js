const express = require('express');
const checkToken = require('../utils/checkToken');
const readBasicAuthFromHeader = require('../utils/readBasicAuthFromHeader');
const readAuthTokenFromHeader = require('../utils/readAuthTokenFromHeader');

const router = express.Router();
const {
  indexUser,
  createUser,
  signIn,
  showUser,
  updateUser,
  destroyUser,
  credentialUser,
} = require('../controllers/userController');

const {
  indexPortfolio,
  createPortfolio,
  showPortfolio,
  showUserPortfolios,
  updatePortfolio,
  destroyPortfolio,
} = require('../controllers/portfolioController');

const {
  indexInvestment,
  createInvestment,
  showInvestment,
  updateInvestment,
  destroyInvestment,
} = require('../controllers/investmentController');

//config the router here in below;add the verb directly on the central router instead of defining the verb in sub routing management files

//For auth and landing
router.get('/', (req, res) => {
  res.send('This is the landing page');
});

router.get('/credentialUser', readAuthTokenFromHeader, credentialUser);

//Users

router.post('/register', createUser);

router.get('/signin', readBasicAuthFromHeader, signIn);

router.get('/users', indexUser);

router.put('/users/:id', updateUser);

router.get('/users/:id', showUser);

router.delete('/users/:id', destroyUser);

//Portfolio

router.get('/portfolios', readAuthTokenFromHeader, indexPortfolio);

router.post('/portfolios', readAuthTokenFromHeader, createPortfolio);

router.get('/user/portfolios', readAuthTokenFromHeader, showUserPortfolios);

router.get('/portfolios/:id', showPortfolio);

router.put('/portfolios/:id', readAuthTokenFromHeader, updatePortfolio);

router.delete('/portfolios/:id', destroyPortfolio);

//Investments

router.get('/investments', checkToken, indexInvestment);

router.post('/investments', readAuthTokenFromHeader, createInvestment);

router.get('/investments/:id', showInvestment);

router.put('/investments/:id', updateInvestment);

router.delete('/investments/:id', readAuthTokenFromHeader, destroyInvestment);

module.exports = router;
