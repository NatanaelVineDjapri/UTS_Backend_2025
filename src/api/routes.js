const express = require('express');

const cocktailRoutes = require('./components/routes/cocktailRoutes');

module.exports = () => {
  const app = express.Router();

  app.use('/cocktails', cocktailRoutes);

  return app;
};
