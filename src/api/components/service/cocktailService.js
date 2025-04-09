const Cocktail = require('../../../models/cocktailModel');
const cocktailRepository = require('../repository/cocktailRepository');

const createCocktail = async (data) => {
  return await cocktailRepository.create(data);
};

const findCocktailByName = async (name) => {
  return await cocktailRepository.findByName(name);
};

const getAllCocktails = async () => {
  return await cocktailRepository.findAllCocktails();
};

const updateCocktailByCocktailId = async (cocktailId, updateData) => {
  return await cocktailRepository.updateCocktailByCocktailId(cocktailId, updateData);
};

const findByFirstLetter = async (letter) => {
  return await cocktailRepository.findByFirstLetter(letter);
};

const getByCocktailId = async (cocktailId) => {
  return await cocktailRepository.findByCocktailId(cocktailId);
};
const getPopularCocktails = async () => {
  return await cocktailRepository.findPopularCocktails();  // lewat repository
};
const getCocktailsByCountry = async (country) => {
  return await cocktailRepository.findByCountry(country);

};
const getCocktailByGlass = async (glass) => {
  return await cocktailRepository.findByGlass(glass);
};

const getCocktailFlavour = async (flavour) => {
  const cocktails = await cocktailRepository.findByFlavour(flavour);
  if (!cocktails.length) {
    throw new Error('No cocktails found with that flavour');
  }
  return cocktails;
}


module.exports = { createCocktail, findCocktailByName, updateCocktailByCocktailId,getAllCocktails,findByFirstLetter,
  getByCocktailId,getPopularCocktails,getCocktailsByCountry,getCocktailByGlass,getCocktailFlavour
 };
