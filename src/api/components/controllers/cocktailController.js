const cocktailService = require('../service/cocktailService');

const createCocktail = async (req, res) => {
  try {
    const newCocktail = await cocktailService.createCocktail(req.body);
    res.status(201).json(newCocktail);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Cocktail already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};


const searchCocktailByName = async (req, res) => {
  try {
    const { name } = req.query; 

    const cocktails = await cocktailService.findCocktailByName(name); 
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCocktails = async (req, res) => {
  try {
    const cocktails = await cocktailService.getAllCocktails();
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCocktailByCocktailId = async (req, res) => {
  try {
    const { cocktailId } = req.params;
    const updateData = req.body;

    const updatedCocktail = await cocktailService.updateCocktailByCocktailId(cocktailId, updateData);

    if (!updatedCocktail) {
      return res.status(404).json({ error: 'Cocktail not found' });
    }

    res.json(updatedCocktail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByFirstLetter = async (req, res) => {
  try {
    const { letter } = req.params; 
    const cocktails = await cocktailService.findByFirstLetter(letter);
    res.status(200).json(cocktails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getByCocktailId = async (req, res) => {
  try {
    const cocktailId = req.params.cocktailId;
    const cocktail = await cocktailService.getByCocktailId(cocktailId);
    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }
    res.json(cocktail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPopularCocktails = async (req, res) => {
  try {
    const popularCocktails = await cocktailService.getPopularCocktails();  // lewat service
    res.status(200).json(popularCocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCountryByName = async (req,res) =>{
  try{
    const { country } = req.params; 
    const cocktails = await cocktailService.getCocktailsByCountry(country);
    res.json(cocktails);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}
const getGlassCocktail = async (req,res) =>{
  try{
    const { glass } = req.params; 
    const cocktails = await cocktailService.getCocktailByGlass(glass);
    res.json(cocktails);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}
module.exports = { createCocktail, searchCocktailByName, updateCocktailByCocktailId,getByFirstLetter,getByCocktailId,getAllCocktails,getPopularCocktails,
  getCountryByName,getGlassCocktail
};
