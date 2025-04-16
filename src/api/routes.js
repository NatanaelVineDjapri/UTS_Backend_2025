const express = require('express');

const cocktailRoutes = require('./components/routes/cocktailRoutes');
const ingredientRoutes = require('./components/routes/ingredientRoutes');

module.exports = () => {
  const app = express.Router();

  app.use('/cocktails', cocktailRoutes);
  app.use('/cocktails', ingredientRoutes);

  return app;
};
