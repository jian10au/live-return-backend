const Investment = require('../models/investment');

const indexInvestment = async (req, res) => {
  console.log('what happens');
  console.log(req.headers.authorization);
  try {
    const allInvestments = await Investment.find({});
    res.send(allInvestments);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createInvestment = async (req, res) => {
  const newInvestment = new Investment({
    quote: req.body.quote,
    exchange: req.body.exchange,
    entryPrice: req.body.entryPrice,
    exitPrice: req.body.exitPrice,
  });
  try {
    await newInvestment.save();
    res.send('ok');
  } catch (err) {
    res.status(400).send(err);
  }
};

const showInvestment = async (req, res) => {
  console.log(req.params.id);
  try {
    const investment = await Investment.findById(req.params.id);
    res.send(investment);
  } catch (error) {
    res.status(404).send(error);
  }
};

// requires body object as such: {active: false}
const updateInvestment = async (req, res) => {
  try {
    const newInvestment = await Investment.findById(req.params.id);
    const data = req.body;
    for (key in data) {
      console.log(
        `Investment ${key} is ${newInvestment[key]}, which now becomes ${data[key]}`
      );
      newInvestment[key] = data[key];
      await Investment.updateOne({ _id: newInvestment._id }, newInvestment);
    }
    res.send(newInvestment);
  } catch (error) {
    res.status(404).send(error);
  }
};

const destroyInvestment = async (req, res) => {
  try {
    await Investment.deleteOne({ _id: req.params.id });
    res.send('Investment has been destroyed.');
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  indexInvestment,
  createInvestment,
  showInvestment,
  updateInvestment,
  destroyInvestment,
};
