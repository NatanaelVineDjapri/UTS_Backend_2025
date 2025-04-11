const cocktailService = require('../service/cocktailService');
const { errorResponder, errorTypes } = require('../../../core/error');

async function createCocktail(req, res, next) {
  try {
    const { name, cocktailId } = req.body;
    if (!name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    if (!cocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'CocktailID is required'
      );
    }
    if (await cocktailService.nameExists(name)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'Name Already Exists'
      );
    }
    if (await cocktailService.cocktailIdExists(cocktailId)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'Cocktail Already Exists'
      );
    }
    if (cocktailId < 10000 || cocktailId > 20000) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be 5-digit number'
      );
    }
    const newCocktail = await cocktailService.createCocktail(req.body);
    if (!newCocktail) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Cocktail Data'
      );
    }
    return res.status(201).json({
      data: newCocktail,
      message: 'Cocktail data successfully created',
    });
  } catch (error) {
    return next(error);
  }
}

async function getCocktailByName(req, res, next) {
  try {
    const { name } = req.params;
    if (!name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    const cocktail = await cocktailService.findCocktailByName(name);
    if (!cocktail) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getAllCocktails(req, res, next) {
  try {
    const cocktails = await cocktailService.getAllCocktails();
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
}
async function updateCocktailById(req, res, next) {
  try {
    const { cocktailId } = req.params;
    const updateData = req.body;
    if (!cocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id is required'
      );
    }
    if (Number.isNaN(cocktailId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be a number'
      );
    }
    if ('cocktailId' in updateData) {
      if (Number(updateData.cocktailId) !== Number(cocktailId)) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'cocktailId cannot be updated'
        );
      }
      delete updateData.cocktailId;
    }
    const updatedCocktail = await cocktailService.updateCocktailByCocktailId(
      cocktailId,
      updateData
    );
    res.json(updatedCocktail);
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
    if (!cocktail) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getByCocktailId(req, res, next) {
  try {
    const { cocktailId } = req.params;
    if (!cocktailId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id is required'
      );
    }
    if (Number.isNaN(cocktailId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Cocktail Id must be a number'
      );
    }
    const cocktail = await cocktailService.getByCocktailId(cocktailId);
    if (!cocktail) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function getPopularCocktails(req, res, next) {
  try {
    const popularCocktails = await cocktailService.getPopularCocktails(); // lewat service
    res.status(200).json(popularCocktails);
  } catch (error) {
    next(error);
  }
}

async function getCountryByName(req, res, next) {
  try {
    const { country } = req.params;
    const cocktails = await cocktailService.getCocktailsByCountry(country);
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
    const { glass } = req.params;
    const cocktails = await cocktailService.getCocktailByGlass(glass);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    res.status(200).json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailFlavour(req, res, next) {
  try {
    const { flavour } = req.params;
    const cocktails = await cocktailService.getCocktailFlavour(flavour);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function getCocktailByAlcoholic(req, res, next) {
  try {
    const cocktails = await cocktailService.getCocktailAlcoholic();
    res.json(cocktails);
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
};
