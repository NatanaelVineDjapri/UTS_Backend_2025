const Ingredient = require('../../../models/ingredientModel');

function sortByName(a, b) {
  const wordA = a.Name.split(' ').length;
  const wordB = b.Name.split(' ').length;

  if (wordA === wordB) {
    return a.Name.localeCompare(b.Name);
  }
  return wordA - wordB;
}

async function createIngredient(data) {
  return Ingredient.create(data);
}

async function getIngredientByName(Name) {
  const Ingredients = await Ingredient.find(
    {
      Name: { $regex: `^${Name.replace(/_/g, ' ')}$`, $options: 'i' },
    },
    { _id: 0 }
  );
  return Ingredients.sort(sortByName);
}

async function getIngredientById(IngredientId) {
  return Ingredient.find({ IngredientId }, { _id: 0 });
}
async function updateIngredientById(IngredientId, updateData) {
  return Ingredient.findOneAndUpdate({ IngredientId }, updateData, {
    new: true,
  });
}

async function deleteIngredientById(IngredientId) {
  return Ingredient.findOneAndDelete({ IngredientId });
}

module.exports = {
  createIngredient,
  getIngredientByName,
  getIngredientById,
  updateIngredientById,
  deleteIngredientById,
};
