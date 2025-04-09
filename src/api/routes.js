const express = require('express');
const router = express.Router();
const cocktailRoutes = require('./components/routes/cocktailRoutes');

// Ini udah bener
router.use('/cocktails', cocktailRoutes);

module.exports = router;
