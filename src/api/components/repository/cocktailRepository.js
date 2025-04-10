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

const findPopularCocktails = async () => {
  return await Cocktail.find({ popular: true });
};

const findByCountry = async (country) => {
  return await Cocktail.find({country: { $regex: `^${country}$`, $options: 'i' }});
};

const findByGlass = async (glass) => {
  return await Cocktail.find({glass: { $regex: `^${glass}$`, $options: 'i' }});
};

const findByFlavour = async (flavour) => {
  return await Cocktail.find({flavour:{$regex:`${flavour}$`,$options : 'i'}});
};

const findAlcoholic = async () => {
  return await Cocktail.find({ Alcoholic : true });
};

module.exports = { 
  create,
  findByName,
  updateCocktailByCocktailId,
  findAllCocktails,
  findByFirstLetter,
  findByCocktailId,
  findPopularCocktails,
  findByCountry,
  findByGlass,
  findByFlavour,
  findAlcoholic
};
