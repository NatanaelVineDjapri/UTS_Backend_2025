const express = require('express');
const cocktailRoutes = require('../api/components/routes/cocktailRoutes');

const app = express();
app.use(express.json());
app.use('/api/cocktails', cocktailRoutes);
app.use((err, req, res, next) => {
    console.error(err); 
    res.status(err.status || 500).json({
      statusCode : false,
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message || 'An unexpected error occurred',
      description: err.description || '',
    });
  });
module.exports = app;
