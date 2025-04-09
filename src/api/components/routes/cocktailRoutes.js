const express = require('express');
const router = express.Router();
const cocktailController = require('../controllers/cocktailController');

router.post('/', cocktailController.createCocktail);
router.get('/', cocktailController.getAllCocktails); 
router.get('/search', cocktailController.searchCocktailByName);
router.get('/popular', cocktailController.getPopularCocktails);

router.put('/:cocktailId', cocktailController.updateCocktailByCocktailId)
router.get('/country/:country',cocktailController.getCountryByName)
router.get('/glass/:glass',cocktailController.getGlassCocktail)
router.get('/letter/:letter', cocktailController.getByFirstLetter);
router.get('/id/:cocktailId', cocktailController.getByCocktailId);


module.exports = router
//flavour,glass,country
