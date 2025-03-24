const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Yhteys tietokantaan onnistui');
  })
  .catch((err) => {
    console.error('Tietokantayhteys epäonnistui:' + err);
  });