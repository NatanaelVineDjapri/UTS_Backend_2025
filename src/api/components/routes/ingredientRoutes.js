const express = require('express');

const router = express.Router();
const ingredientController = require('../controllers/ingredientController'); // Correct import

// Correctly using ingredientController instead of cocktailController
router.post('/ingredient', ingredientController.createIngredient);
router.put(
  '/ingredient/update/:IngredientId',
  ingredientController.updateIngredientById
);
router.delete(
  '/ingredient/delete/:IngredientId',
  ingredientController.deleteIngredientById
);
router.get(
  '/ingredient/search/name/:IngredientName',
  ingredientController.getIngredientByName
);
router.get(
  '/ingredient/search/id/:IngredientId',
  ingredientController.getIngredientById
);

module.exports = router;
