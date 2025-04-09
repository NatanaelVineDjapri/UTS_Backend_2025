const express = require('express');
const cocktailRoutes = require('../api/components/routes/cocktailRoutes');

const app = express();
app.use(express.json());


app.use('/api/cocktails', cocktailRoutes);

module.exports = app;
