const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 5000;
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(
  process.env.DB_URL,

  dbOptions,
  (err) => {
    if (err) {
      console.log('DB not connected');
    } else {
      console.log('DB connected');
    }
  }
);

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

app.use(routes);

app.listen(port, () => console.log('Listening on PORT', port));
