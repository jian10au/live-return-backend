const Portfolio = require('../models/portfolio');

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
  try {
    await newPortfolio.save();
    res.send('ok');
  } catch (err) {
    res.status(400).send(err);
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
};
