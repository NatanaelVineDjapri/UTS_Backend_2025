const cocktailService = require('../service/cocktailService');
const { errorResponder, errorTypes } = require('../../../core/error');
const createCocktail = async (req, res,next) => {
  try {
    const newCocktail = await cocktailService.createCocktail(req.body);
    res.status(201).json(newCocktail);
  } catch (error) {
    if (error.code === 11000) {
      return next(errorResponder(errorTypes.DB_DUPLICATE_CONFLICT, 'Cocktail already exists'));
    }
    return next(errorResponder(errorTypes.DB, error.message));
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
const updateCocktailByCocktailId = async (req, res,next) => {
  try {
    const { cocktailId } = req.params;
    const updateData = req.body;

    const updatedCocktail = await cocktailService.updateCocktailByCocktailId(cocktailId, updateData);

    if (!updatedCocktail) {
      return res.status(404).json({ error: 'Cocktail not found' });
    }

    res.json(updatedCocktail);
    } catch (error) {
    next(error);
  }
};

const getByFirstLetter = async (req, res,next) => {
  try {
    const { letter } = req.query; 
    const cocktails = await cocktailService.findByFirstLetter(letter);
    res.status(200).json(cocktails);
  } catch (error) {
    next(error);
  }
}

const getByCocktailId = async (req, res,next) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await cocktailService.getByCocktailId(cocktailId);
    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
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
    res.json(cocktails);
  } catch (error){
    next(error);
  }
}
const getGlassCocktail = async (req,res,next) =>{
  try{
    const { glass } = req.params; 
    const cocktails = await cocktailService.getCocktailByGlass(glass);
    res.status(200).json(cocktails);
  } catch (error){
    next(error);
  }
}
const getCocktailFlavour = async (req,res,next) =>{
  try{
    const {flavour} = req.params;

    const cocktails = await cocktailService.getCocktailFlavour(flavour);
    res.json(cocktails);
  } catch(error){
    next(error);
  }
}
module.exports = { createCocktail, getCocktailByName, updateCocktailByCocktailId,getByFirstLetter,getByCocktailId,getAllCocktails,getPopularCocktails,
  getCountryByName,getGlassCocktail,getCocktailFlavour
};
