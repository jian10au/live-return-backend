const express = require('express');
const checkToken = require('../utils/checkToken');

const router = express.Router();
const {
  indexUser,
  createUser,
  login,
  showUser,
  updateUser,
  destroyUser,
  getUserProfile,
} = require('../controllers/userController');

const {
  indexPortfolio,
  createPortfolio,
  showPortfolio,
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

router.get('/userprofile', getUserProfile);

//Users

router.post('/registration', createUser);

router.post('/login', login);

router.get('/users', indexUser);

router.put('/users/:id', updateUser);

router.get('/users/:id', showUser);

router.delete('/users/:id', destroyUser);

//Portfolio

router.get('/portfolios', checkToken, indexPortfolio);

router.post('/portfolios', createPortfolio);

router.get('/portfolios/:id', showPortfolio);

router.put('/portfolios/:id', updatePortfolio);

router.delete('/portfolios/:id', destroyPortfolio);

//Investments

router.get('/investments', checkToken, indexInvestment);

router.post('/investments', createInvestment);

router.get('/investments/:id', showInvestment);

router.put('/investments/:id', updateInvestment);

router.delete('/investments/:id', destroyInvestment);

module.exports = router;
