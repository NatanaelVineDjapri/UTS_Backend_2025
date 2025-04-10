const cocktailService = require('../service/cocktailService');
const { errorResponder, errorTypes } = require('../../../core/error');
const createCocktail = async (req, res,next) => {
  try {
    const {
      name,
      cocktailId,
    } = req.body;
    if (!name){
      throw errorResponder(errorTypes.VALIDATION_ERROR,'Name is required');
    }
    if (!cocktailId){
      throw errorResponder(errorTypes.VALIDATION_ERROR,'CocktailID is required');
    }
    if(await cocktailService.nameExists(name)){
      throw errorResponder(errorTypes.NAME_ALREADY_TAKEN,'Name Already Exists');
    }
    if(await cocktailService.cocktailIdExists(cocktailId)){
      throw errorResponder(errorTypes.NAME_ALREADY_TAKEN,'Cocktail Already Exists');
    }
    if(cocktailId<10000 || cocktailId>20000){
      throw errorResponder(errorTypes.VALIDATION_ERROR,'Cocktail Id must be 5-digit number');
    }
    const newCocktail = await cocktailService.createCocktail(req.body);
    if (!newCocktail){
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY,'Failed to create Cocktail Data');
    }
    return res.status(201).json({data:newCocktail,message :'Cocktail data successfully created'});

  } catch (error) {
    next(error);
  }
};


const getCocktailByName = async (req, res,next) => {
  try {
    const { name } = req.query; 
    const cocktails = await cocktailService.findCocktailByName(name); 
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
};

const getAllCocktails = async (req,res,next) => {
  try {
    const cocktails = await cocktailService.getAllCocktails();
    res.json(cocktails);
  } catch (error) {
    next(error);
  }
};
const updateCocktailById= async (req, res,next) => {
  try {
    const { cocktailId } = req.params;
    const updateData = req.body;
    if (!cocktailId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Cocktail Id is required');
    }
    if (isNaN(cocktailId)) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Cocktail Id must be a number');
    }
    if ('cocktailId' in updateData) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'cocktailId cannot be updated');
    }
    const updatedCocktail = await cocktailService.updateCocktailByCocktailId(cocktailId, updateData);
    res.json(updatedCocktail);
    } catch (error) {
    next(error);
  }
};

const getByFirstLetter = async (req, res,next) => {
  try {
    const { letter } = req.query; 
    if (!letter) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Query "letter" is required');
    }
    if (letter.length !== 1) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Query "letter" must be a single alphabet character');
    }
    const cocktails = await cocktailService.findByFirstLetter(letter);
    res.json(cocktails); 
  } catch (error) {
    next(error); 
  }
}

const getByCocktailId = async (req, res,next) => {
  try {
    const cocktailId = req.params.cocktailId;
    if (!cocktailId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Cocktail Id is required');
    }

    if (isNaN(cocktailId)) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Cocktail Id must be a number');
    }
    
    const cocktail = await cocktailService.getByCocktailId(cocktailId);
    if (!cocktail) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Cocktail not found');
    }
    res.json(cocktail);
  } catch (error) {
    next(error);
  }
};


const getPopularCocktails = async (req,res,next) => {
  try {
    const popularCocktails = await cocktailService.getPopularCocktails();  // lewat service
    res.status(200).json(popularCocktails);
  } catch (error) {
    next(error);
  }
};

const getCountryByName = async (req,res,next) =>{
  try{
    const { country } = req.params; 
    const cocktails = await cocktailService.getCocktailsByCountry(country);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found for this country');
    }
    res.json(cocktails);
  } catch (error){
    next(error); 
  }
}
const getGlassCocktail = async (req,res,next) =>{
  try{
    const { glass } = req.params; 
    const cocktails = await cocktailService.getCocktailByGlass(glass);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    res.status(200).json(cocktails);
  } catch (error){
    next(error);
  }
}
const getCocktailFlavour = async (req,res,next) =>{
  try{
    const {flavour} = req.params;
    const cocktails = await cocktailService.getCocktailFlavour(flavour);
    if (cocktails.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'No cocktails found ');
    }
    res.json(cocktails);
  } catch(error){
    next(error);
  }
}

const getCocktailByAlcoholic = async (req,res,next) =>{
  try{
    const cocktails = await cocktailService.getCocktailAlcoholic();
    res.json(cocktails);
  } catch(error){
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
  getCocktailByAlcoholic
};
