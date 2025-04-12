const Cocktail = require('../../../models/cocktailModel');

async function create(data) {
  return Cocktail.create(data);
}
function sortByName(a, b) {
  const wordA = a.Name.split(' ').length;
  const wordB = b.Name.split(' ').length;

  if (wordA === wordB) {
    return a.Name.localeCompare(b.Name);
  }
  return wordA - wordB;
}

async function findByName(Name) {
  const cocktail = await Cocktail.find({
    Name: { $regex: Name, $options: 'i' },
  });
  return cocktail.sort(sortByName);
}

async function findAllCocktails() {
  return Cocktail.find({});
}

async function updateCocktailByCocktailId(CocktailId, updateData) {
  return Cocktail.findOneAndUpdate({ CocktailId }, updateData, { new: true });
}

async function findByFirstLetter(letter) {
  return Cocktail.find({ Name: { $regex: `^${letter}`, $options: 'i' } });
}

async function findByCocktailId(CocktailId) {
  return Cocktail.findOne({ CocktailId });
}

async function findPopularCocktails() {
  return Cocktail.find({ Popular: true });
}

async function findByCountry(Country) {
  return Cocktail.find({ Country: { $regex: `^${Country}$`, $options: 'i' } });
}

async function findByGlass(Glass) {
  return Cocktail.find({ Glass: { $regex: `^${Glass}$`, $options: 'i' } });
}

async function findByFlavour(Flavour) {
  return Cocktail.find({ Flavour: { $regex: `${Flavour}$`, $options: 'i' } });
}

async function findAlcoholic() {
  return Cocktail.find({ Alcoholic: true });
}
async function findNonAlcoholic() {
  return Cocktail.find({ Alcoholic: false });
}

async function findLatestCocktail() {
  return Cocktail.find().sort({ dateModified: -1 }).limit(2);
}

async function findByCategory(Category) {
  return Cocktail.find({
    Category: { $regex: `^${Category}$`, $options: 'i' },
  });
}

async function findRandomCategory() {
  return Cocktail.aggregate([{ $sample: { size: 1 } }]);
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
  findNonAlcoholic,
  findLatestCocktail,
  findByCategory,
  findRandomCategory,
};
