const cocktailService = require('../service/cocktailService');
const { errorResponder, errorTypes } = require('../../../core/error');

async function createCocktail(req, res, next) {
  try {
    const { Name, CocktailId } = req.body;
    if (!Name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    if (!CocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'CocktailID is required'
      );
    }
    if (await cocktailService.nameExists(Name)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'Name Already Exists'
      );
    }
    if (await cocktailService.cocktailIdExists(CocktailId)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'CocktailID Already Exists'
      );
    }
    if (CocktailId < 10000 || CocktailId > 20000) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be 5-digit number and must in Coctailid Range'
      );
    }
    req.body.dateModified = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const newCocktail = await cocktailService.createCocktail(req.body);
    if (!newCocktail) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Cocktail Data'
      );
    }
    return res.status(201).json(newCocktail);
  } catch (error) {
    return next(error);
  }
}

async function getCocktailByName(req, res, next) {
  try {
    const { Name } = req.params;
    if (!Name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    const cocktail = await cocktailService.findCocktailByName(Name);
    if (cocktail.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getAllCocktails(req, res, next) {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    const cocktails = await cocktailService.getAllCocktails(offset, limit);
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function updateCocktailById(req, res, next) {
  try {
    const { CocktailId } = req.params;
    const updateData = req.body;
    if (!CocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id is required'
      );
    }
    if (Number.isNaN(CocktailId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be a number'
      );
    }
    if ('cocktailId' in updateData) {
      if (Number(updateData.cocktailId) !== Number(CocktailId)) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'cocktailId cannot be updated'
        );
      }
      delete updateData.cocktailId;
    }
    req.body.dateModified = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const updatedCocktail = await cocktailService.updateCocktailByCocktailId(
      CocktailId,
      updateData
    );
    res.json(updatedCocktail);
  } catch (error) {
    next(error);
  }
}

async function deleteCocktailById(req, res, next) {
  try {
    const { CocktailId } = req.params;
    if (!CocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id is required'
      );
    }
    if (Number.isNaN(CocktailId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be a number'
      );
    }
    const deleteCocktail =
      await cocktailService.deleteCocktailByCocktailId(CocktailId);
    if (!deleteCocktail) {
      throw errorResponder(errorTypes.NOT_FOUND, 'CocktailID not found');
    }
    res.json(deleteCocktail);
  } catch (error) {
    next(error);
  }
}

async function getByFirstLetter(req, res, next) {
  try {
    const { letter } = req.params;
    if (!letter) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Query "letter" is required'
      );
    }
    if (letter.length !== 1) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Query "letter" must be a single alphabet character'
      );
    }
    const cocktail = await cocktailService.findByFirstLetter(letter);
    if (cocktail.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getByCocktailId(req, res, next) {
  try {
    const { CocktailId } = req.params;
    if (!CocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id is required'
      );
    }
    if (Number.isNaN(CocktailId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be a number'
      );
    }
    if (CocktailId < 10000 || CocktailId > 20000) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be 5-digit number'
      );
    }
    const cocktail = await cocktailService.getByCocktailId(CocktailId);
    if (cocktail.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getPopularCocktails(req, res, next) {
  try {
    const popularCocktails = await cocktailService.getPopularCocktails();
    res.status(200).json(popularCocktails);
  } catch (error) {
    next(error);
  }
}

async function getCountryByName(req, res, next) {
  try {
    const { Country } = req.params;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const cocktails = await cocktailService.getCocktailsByCountry(
      Country,
      offset,
      limit
    );
    if (cocktails.length === 0) {
      throw errorResponder(
        errorTypes.NOT_FOUND,
        'No cocktails found for this country'
      );
    }
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function getGlassCocktail(req, res, next) {
  try {
    const { Glass } = req.params;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const cocktails = await cocktailService.getCocktailByGlass(
      Glass,
      offset,
      limit
    );
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    const filterCocktails = cocktails.map((cocktail) => ({
      Name: cocktail.Name,
      Drinkthumb: cocktail.DrinkThumb,
      CocktailId: cocktail.CocktailId,
    }));
    res.status(200).json(filterCocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailFlavour(req, res, next) {
  try {
    const { Flavour } = req.params;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const cocktails = await cocktailService.getCocktailFlavour(
      Flavour,
      offset,
      limit
    );
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    const filterCocktails = cocktails.map((cocktail) => ({
      Name: cocktail.Name,
      Drinkthumb: cocktail.DrinkThumb,
      CocktailId: cocktail.CocktailId,
    }));
    res.json(filterCocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailByAlcoholic(req, res, next) {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const cocktails = await cocktailService.getCocktailAlcoholic(offset, limit);
    const filterCocktails = cocktails.map((cocktail) => ({
      name: cocktail.Name,
      Drinkthumb: cocktail.DrinkThumb,
      cocktailId: cocktail.CocktailId,
    }));
    res.json(filterCocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailByNonAlcoholic(req, res, next) {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const cocktails = await cocktailService.getCocktailNonAlcoholic(
      offset,
      limit
    );
    const filterCocktails = cocktails.map((cocktail) => ({
      name: cocktail.Name,
      Drinkthumb: cocktail.DrinkThumb,
      cocktailId: cocktail.CocktailId,
    }));
    res.json(filterCocktails);
  } catch (error) {
    next(error);
  }
}

async function getLatestCocktail(req, res, next) {
  try {
    const cocktail = await cocktailService.getLatestCocktail();
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getCategoryCocktail(req, res, next) {
  try {
    const { Category } = req.params;
    const cocktails = await cocktailService.getCategoryCocktail(Category);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    const filterCocktails = cocktails.map((cocktail) => ({
      Name: cocktail.Name,
      Drinkthumb: cocktail.DrinkThumb,
      CocktailId: cocktail.CocktailId,
    }));
    res.status(200).json(filterCocktails);
  } catch (error) {
    next(error);
  }
}

async function getRandomCocktail(req, res, next) {
  try {
    const cocktails = await cocktailService.getRandomCocktail();
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailByIngredient(req, res, next) {
  try {
    const { ingredient } = req.params;
    if (!ingredient) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Ingredient is required');
    }

    const cocktails = await cocktailService.findByIngredientName(ingredient);

    if (!cocktails || cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found with that ingredient');
    }

    res.status(200).json(cocktails);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  createCocktail,
  getCocktailByName,
  updateCocktailById,
  getByFirstLetter,
  getByCocktailId,
  getAllCocktails,
  getPopularCocktails,
  getCountryByName,
  getGlassCocktail,
  getCocktailFlavour,
  getCocktailByAlcoholic,
  getCocktailByNonAlcoholic,
  getLatestCocktail,
  getCategoryCocktail,
  getRandomCocktail,
  deleteCocktailById,
  getCocktailByIngredient,
};
