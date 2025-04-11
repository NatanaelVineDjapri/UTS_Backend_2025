const cocktailRepository = require('../repository/cocktailRepository');

async function createCocktail(data) {
  return cocktailRepository.create(data);
}

async function nameExists(name) {
  const cocktails = await cocktailRepository.findByName(name);
  return !!cocktails.length;
}

async function cocktailIdExists(cocktailId) {
  const cocktails = await cocktailRepository.findByCocktailId(cocktailId);
  return !!cocktails.length;
}

async function findCocktailByName(name) {
  return cocktailRepository.findByName(name);
}

async function getAllCocktails() {
  return cocktailRepository.findAllCocktails();
}

async function updateCocktailByCocktailId(cocktailId, updateData) {
  return cocktailRepository.updateCocktailByCocktailId(cocktailId, updateData);
}

async function findByFirstLetter(letter) {
  return cocktailRepository.findByFirstLetter(letter);
}

async function getByCocktailId(cocktailId) {
  return cocktailRepository.findByCocktailId(cocktailId);
}

async function getPopularCocktails() {
  return cocktailRepository.findPopularCocktails();
}

async function getCocktailsByCountry(country) {
  return cocktailRepository.findByCountry(country);
}

async function getCocktailByGlass(glass) {
  return cocktailRepository.findByGlass(glass);
}

async function getCocktailFlavour(flavour) {
  const cocktails = await cocktailRepository.findByFlavour(flavour);
  if (!cocktails.length) {
    throw new Error('No cocktails found with that flavour');
  }
  return cocktails;
}

async function getCocktailAlcoholic() {
  return cocktailRepository.findAlcoholic();
}

module.exports = {
  createCocktail,
  findCocktailByName,
  updateCocktailByCocktailId,
  getAllCocktails,
  findByFirstLetter,
  getByCocktailId,
  getPopularCocktails,
  getCocktailsByCountry,
  getCocktailByGlass,
  getCocktailFlavour,
  getCocktailAlcoholic,
  nameExists,
  cocktailIdExists,
};
