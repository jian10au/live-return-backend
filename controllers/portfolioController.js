const Portfolio = require('../models/portfolio');
const User = require('../models/user');

const indexPortfolio = async (req, res) => {
  try {
    const allPortfolios = await Portfolio.find({});
    res.send(allPortfolios);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createPortfolio = async (req, res) => {
  const newPortfolio = new Portfolio({
    name: req.body.name,
    description: req.body.description,
    investments: [],
  });
  console.log(res.locals.decoded, 'get res locals decoded');

  try {
    const savedPortfolio = await newPortfolio.save();
    if (!savedPortfolio) {
      throw Error('Something went wrong with saving the portfolio');
    }

    const userFetched = await User.findOne({ _id: res.locals.decoded._id });
    if (!userFetched) {
      throw Error('Something went wrong with finding the user');
    }
    userFetched.portfolios.push(savedPortfolio._id);
    const updatedUser = await userFetched.save();
    console.log(updatedUser, 'Check if the it is saved successfully');

    res.status(200).json({
      msg: `The new portfolio is saved to user account ${userFetched.email}`,
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const showUserPortfolios = async (req, res) => {
  try {
    console.log('what happpensS');
    console.log(res.locals.decoded);
    const userFetched = await User.findOne({
      _id: res.locals.decoded._id,
    }).populate('portfolios');
    console.log(userFetched);
    console.log(userFetched.portfolios, 'findNothing?');
    res.status(200).send(userFetched.portfolios);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const showPortfolio = async (req, res) => {
  console.log(req.params.id);

  try {
    const portfolio = await Portfolio.findById(req.params.id);
    res.send(portfolio);
  } catch (error) {
    res.status(404).send(error);
  }
};

// requires body object as such: {active: false}
const updatePortfolio = async (req, res) => {
  try {
    const newPortfolio = await Portfolio.findById(req.params.id);
    const data = req.body;
    for (key in data) {
      console.log(
        `portfolio ${key} is ${newPortfolio[key]}, which now becomes ${data[key]}`
      );
      newPortfolio[key] = data[key];
      await Portfolio.updateOne({ _id: newPortfolio._id }, newPortfolio);
    }
    res.send(newPortfolio);
  } catch (error) {
    res.status(404).send(error);
  }
};

const destroyPortfolio = async (req, res) => {
  try {
    await Portfolio.deleteOne({ _id: req.params.id });
    res.send('portfolio has been destroyed.');
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  indexPortfolio,
  createPortfolio,
  showPortfolio,
  updatePortfolio,
  destroyPortfolio,
  showUserPortfolios,
};
