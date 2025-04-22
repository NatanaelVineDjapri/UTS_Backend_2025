const ingredientRepository = require('../repository/ingredientRepository');

async function createIngredient(data) {
  return ingredientRepository.createIngredient(data); 
}

async function ingredientNameExists(Name) {
  const ingredients = await ingredientRepository.getIngredientByName(Name);
  return !!ingredients.length;
}
async function ingredientIdExists(IngredientId) {
  const ingredients =
    await ingredientRepository.getIngredientById(IngredientId); // Correct repository usage
  return !!ingredients.length > 0;
}

async function getIngredientByName(Name) {
  return ingredientRepository.getIngredientByName(Name); // Correct repository usage
}

async function updateIngredientById(IngredientId, updateData) {
  return ingredientRepository.updateIngredientById(IngredientId, updateData); // Correct repository usage
}

async function deleteIngredientById(IngredientId) {
  return ingredientRepository.deleteIngredientById(IngredientId); // Correct repository usage
}

async function getIngredientById(IngredientId) {
  return ingredientRepository.getIngredientById(IngredientId); // Correct repository usage
}

async function getAllIngredient(offset, limit) {
  return ingredientRepository.getAllIngredient(offset, limit);
}
module.exports = {
  createIngredient,
  ingredientNameExists,
  ingredientIdExists,
  getIngredientByName,
  updateIngredientById,
  deleteIngredientById,
  getIngredientById,
  getAllIngredient
};
