const express = require('express');
const cors = require('cors');
const app = express();

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const routes = require('./routes');
const { testConnectionDB } = require('./sequelize')

const PORT = Number(process.env.PORT) || 3000

app.use(cors());
app.use('/', routes);

testConnectionDB();

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`App running http://localhost:${PORT}`)
  })
}

module.exports = app;