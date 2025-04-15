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

async function getAllCocktails(offset, limit) {
  return cocktailRepository.findAllCocktails(offset, limit);
}

async function updateCocktailByCocktailId(CocktailId, updateData) {
  return cocktailRepository.updateCocktailByCocktailId(CocktailId, updateData);
}

async function deleteCocktailByCocktailId(cocktailId) {
  return cocktailRepository.deleteCocktailByCocktailId(cocktailId);
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

async function getCocktailsByCountry(Country, offset, limit) {
  return cocktailRepository.findByCountry(Country, offset, limit);
}

async function getCocktailByGlass(Glass, offset, limit) {
  return cocktailRepository.findByGlass(Glass, offset, limit);
}

async function getCocktailFlavour(Flavour, offset, limit) {
  const cocktails = await cocktailRepository.findByFlavour(
    Flavour,
    offset,
    limit
  );
  if (!cocktails.length) {
    throw new Error('No cocktails found with that flavour');
  }
  return cocktails;
}

async function getCocktailAlcoholic(offset, limit) {
  return cocktailRepository.findAlcoholic(offset, limit);
}

async function getCocktailNonAlcoholic(offset, limit) {
  return cocktailRepository.findNonAlcoholic(offset, limit);
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

async function getCocktailStats() {
  const total = await cocktailRepository.countAll();
  const byCategory = await cocktailRepository.groupBy('Category');
  const byCountry = await cocktailRepository.groupBy('Country');
  const byGlass = await cocktailRepository.groupBy('Glass');
  const alcoholStats = await cocktailRepository.groupBy('Alcoholic');

  return {
    total,
    byCategory,
    byCountry,
    byGlass,
    alcoholStats,
  };
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
  deleteCocktailByCocktailId,
  getCocktailStats,
};
