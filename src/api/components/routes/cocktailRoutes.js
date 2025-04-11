const express = require('express');

const router = express.Router();
const cocktailController = require('../controllers/cocktailController');

router.post('/', cocktailController.createCocktail);
router.get('/all', cocktailController.getAllCocktails);
router.get('/search/:name', cocktailController.getCocktailByName);
router.get('/popular', cocktailController.getPopularCocktails);
router.put('/update/:cocktailId', cocktailController.updateCocktailById);
router.get('/country/:country', cocktailController.getCountryByName);
router.get('/glass/:glass', cocktailController.getGlassCocktail);
router.get('/letter/:letter', cocktailController.getByFirstLetter);
router.get('/id/:cocktailId', cocktailController.getByCocktailId);
router.get('/flavour/:flavour', cocktailController.getCocktailFlavour);
router.get('/alcoholic', cocktailController.getCocktailByAlcoholic);

module.exports = router;
