const Cocktail = require('../../../models/cocktailModel');


const create = async (data) => {
  return await Cocktail.create(data);
};


const findByName = async (name) => {
  return await Cocktail.find({ name: { $regex: name, $options: 'i' } });
};

const findAllCocktails = async () => {
  return await Cocktail.find({}); 
};


const updateCocktailByCocktailId = async (cocktailId, updateData) => {
  return await Cocktail.findOneAndUpdate(
    { cocktailId: cocktailId },   
    updateData,
    { new: true }               
  );
};


const findByFirstLetter = async (letter) => {
  return await Cocktail.find({
    name: { $regex: `^${letter}`, $options: 'i' }
  });
};
const findByCocktailId = async (cocktailId) => {
  return await Cocktail.findOne({ cocktailId: cocktailId });
};

module.exports = { create, findByName, updateCocktailByCocktailId,findAllCocktails,findByFirstLetter ,findByCocktailId};
