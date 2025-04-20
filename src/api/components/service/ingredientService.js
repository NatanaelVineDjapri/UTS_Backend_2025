const ingredientRepository = require('../repository/ingredientRepository'); // Correct repository import

async function createIngredient(data) {
  return ingredientRepository.createIngredient(data); // Correct repository usage
}

async function ingredientNameExists(Name) {
  const ingredients = await ingredientRepository.getIngredientByName(Name); // Correct repository usage
  return !!ingredients.length;
}
async function ingredientIdExists(IngredientId) {
  const ingredients =
    await ingredientRepository.getIngredientById(IngredientId);
  return !!ingredients.length > 0;
}

async function getIngredientByName(Name) {
  return ingredientRepository.getIngredientByName(Name);
}

async function updateIngredientById(IngredientId, updateData) {
  return ingredientRepository.updateIngredientById(IngredientId, updateData);
}

async function deleteIngredientById(IngredientId) {
  return ingredientRepository.deleteIngredientById(IngredientId);
}

async function getIngredientById(IngredientId) {
  return ingredientRepository.getIngredientById(IngredientId);
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
