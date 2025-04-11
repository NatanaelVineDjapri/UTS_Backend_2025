const Cocktail = require('../../../models/cocktailModel');

async function create(data) {
  return Cocktail.create(data);
}

async function findByName(name) {
  return Cocktail.find({ name: { $regex: name, $options: 'i' } });
}

async function findAllCocktails() {
  return Cocktail.find({});
}

async function updateCocktailByCocktailId(cocktailId, updateData) {
  return Cocktail.findOneAndUpdate({ cocktailId }, updateData, { new: true });
}

async function findByFirstLetter(letter) {
  return Cocktail.find({ name: { $regex: `^${letter}`, $options: 'i' } });
}

async function findByCocktailId(cocktailId) {
  return Cocktail.findOne({ cocktailId });
}

async function findPopularCocktails() {
  return Cocktail.find({ popular: true });
}

async function findByCountry(country) {
  return Cocktail.find({ country: { $regex: `^${country}$`, $options: 'i' } });
}

async function findByGlass(glass) {
  return Cocktail.find({ glass: { $regex: `^${glass}$`, $options: 'i' } });
}

async function findByFlavour(flavour) {
  return Cocktail.find({ flavour: { $regex: `${flavour}$`, $options: 'i' } });
}

async function findAlcoholic() {
  return Cocktail.find({ Alcoholic: true });
}

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
  findAlcoholic,
};
