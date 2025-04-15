const express = require('express');

const router = express.Router();
const cocktailController = require('../controllers/cocktailController');

router.post('/', cocktailController.createCocktail);
router.get('/all', cocktailController.getAllCocktails);
router.get('/search/:Name', cocktailController.getCocktailByName);
router.get('/popular', cocktailController.getPopularCocktails);
router.put('/update/:CocktailId', cocktailController.updateCocktailById);
router.delete('/delete/:CocktailId', cocktailController.deleteCocktailById);
router.get('/country/:Country', cocktailController.getCountryByName);
router.get('/glass/:Glass', cocktailController.getGlassCocktail);
router.get('/letter/:letter', cocktailController.getByFirstLetter);
router.get('/id/:CocktailId', cocktailController.getByCocktailId);
router.get('/flavour/:Flavour', cocktailController.getCocktailFlavour);
router.get('/alcoholic', cocktailController.getCocktailByAlcoholic);
router.get('/nonalcoholic', cocktailController.getCocktailByNonAlcoholic);
router.get('/latest', cocktailController.getLatestCocktail);
router.get('/category/:Category', cocktailController.getCategoryCocktail);
router.get('/random', cocktailController.getRandomCocktail);
router.get('/stats', cocktailController.getCocktailStats);

module.exports = router;
