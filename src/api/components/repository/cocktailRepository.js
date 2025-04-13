const Cocktail = require('../../../models/cocktailModel');

function sortByName(a, b) {
  const wordA = a.Name.split(' ').length;
  const wordB = b.Name.split(' ').length;

  if (wordA === wordB) {
    return a.Name.localeCompare(b.Name);
  }
  return wordA - wordB;
}

async function create(data) {
  return Cocktail.create(data);
}

async function findByName(Name) {
  const cocktail = await Cocktail.find(
    {
      Name: { $regex: `^${Name.replace(/_/g, ' ')}$`, $options: 'i' },
    },
    { _id: 0 }
  );
  return cocktail.sort(sortByName);
}

async function findAllCocktails() {
  return Cocktail.find({}, { _id: 0 });
}

async function updateCocktailByCocktailId(CocktailId, updateData) {
  return Cocktail.findOneAndUpdate({ CocktailId }, updateData, { new: true });
}

async function deleteCocktailByCocktailId(CocktailId) {
  return Cocktail.findOneAndDelete({ CocktailId });
}

async function findByFirstLetter(letter) {
  return Cocktail.find(
    { Name: { $regex: `^${letter}`, $options: 'i' } },
    { _id: 0 }
  );
}

async function findByCocktailId(CocktailId) {
  return Cocktail.findOne({ CocktailId }, { _id: 0 });
}

async function findPopularCocktails() {
  return Cocktail.find({ Popular: true }, { _id: 0 });
}

async function findByCountry(Country) {
  return Cocktail.find(
    { Country: { $regex: `^${Country.replace(/_/g, ' ')}$`, $options: 'i' } },
    { _id: 0 }
  );
}

async function findByGlass(Glass) {
  return Cocktail.find(
    { Glass: { $regex: `^${Glass.replace(/_/g, ' ')}$`, $options: 'i' } },
    { _id: 0 }
  );
}

async function findByFlavour(Flavour) {
  return Cocktail.find(
    { Flavour: { $regex: Flavour, $options: 'i' } },
    { _id: 0 }
  );
}

async function findAlcoholic() {
  return Cocktail.find({ Alcoholic: true }, { _id: 0 });
}
async function findNonAlcoholic() {
  return Cocktail.find({ Alcoholic: false }, { _id: 0 });
}

async function findLatestCocktail() {
  return Cocktail.find({}, { _id: 0 }).sort({ dateModified: -1 }).limit(10);
}

async function findByCategory(Category) {
  return Cocktail.find(
    {
      Category: { $regex: `^${Category.replace(/_/g, ' ')}$`, $options: 'i' },
    },
    { _id: 0 }
  );
}

async function findRandomCategory() {
  return Cocktail.aggregate([
    { $sample: { size: 1 } },
    { $project: { _id: 0 } },
  ]);
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
  deleteCocktailByCocktailId,
};
