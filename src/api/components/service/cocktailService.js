const cocktailRepository = require('../repository/cocktailRepository');

async function createCocktail(data) {
  return cocktailRepository.create(data);
}

async function nameExists(Name) {
  const cocktails = await cocktailRepository.findByName(Name);
  return !!cocktails.length;
}

async function cocktailIdExists(CocktailId) {
  const cocktails = await cocktailRepository.findByCocktailId(CocktailId);
  return !!cocktails;
}

async function findCocktailByName(Name) {
  return cocktailRepository.findByName(Name);
}

async function getAllCocktails() {
  return cocktailRepository.findAllCocktails();
}

async function updateCocktailByCocktailId(CocktailId, updateData) {
  return cocktailRepository.updateCocktailByCocktailId(CocktailId, updateData);
}

async function findByFirstLetter(letter) {
  return cocktailRepository.findByFirstLetter(letter);
}

async function getByCocktailId(CocktailId) {
  return cocktailRepository.findByCocktailId(CocktailId);
}

async function getPopularCocktails() {
  return cocktailRepository.findPopularCocktails();
}

async function getCocktailsByCountry(Country) {
  return cocktailRepository.findByCountry(Country);
}

async function getCocktailByGlass(Glass) {
  return cocktailRepository.findByGlass(Glass);
}

async function getCocktailFlavour(Flavour) {
  const cocktails = await cocktailRepository.findByFlavour(Flavour);
  if (!cocktails.length) {
    throw new Error('No cocktails found with that flavour');
  }
  return cocktails;
}

async function getCocktailAlcoholic() {
  return cocktailRepository.findAlcoholic();
}

async function getCocktailNonAlcoholic() {
  return cocktailRepository.findNonAlcoholic();
}

async function getLatestCocktail() {
  return cocktailRepository.findLatestCocktail();
}

async function getCategoryCocktail(Category) {
  return cocktailRepository.findByCategory(Category);
}
async function getRandomCocktail() {
  return cocktailRepository.findRandomCategory();
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
  getCocktailNonAlcoholic,
  nameExists,
  cocktailIdExists,
  getLatestCocktail,
  getCategoryCocktail,
  getRandomCocktail,
};
