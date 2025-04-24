const ingredientService = require('../service/ingredientService'); 
const { errorResponder, errorTypes } = require('../../../core/error');

async function createIngredient(req, res, next) {
  try {
    const { Name, IngredientId } = req.body;
    if (!Name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    if (!IngredientId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'IngredientId is required' 
      );
    }
    if (await ingredientService.ingredientNameExists(Name)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'Name Already Exists'
      );
    }
    if (await ingredientService.ingredientIdExists(IngredientId)) {
      throw errorResponder(
        errorTypes.NAME_ALREADY_TAKEN,
        'IngredientId Already Exists'
      );
    }
    if (IngredientId < 1 || IngredientId > 1000) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Ingredient Id must be within the range of 1 to 1000'
      );
    }
    req.body.dateModified = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const newIngredient = await ingredientService.createIngredient(req.body); 
    if (!newIngredient) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Ingredient Data'
      );
    }
    return res.status(201).json(newIngredient);
  } catch (error) {
    return next(error);
  }
}

async function updateIngredientById(req, res, next) {
  try {
    const { IngredientId } = req.params;
    const updateData = req.body;
    if (!IngredientId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'IngredientId is required'
      );
    }
    if (Number.isNaN(IngredientId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'IngredientId must be a number'
      );
    }
    if ('IngredientId' in updateData) {
      if (Number(updateData.IngredientId) !== Number(IngredientId)) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          'IngredientId cannot be updated'
        );
      }
      delete updateData.IngredientId;
    }
    req.body.dateModified = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const updatedIngredient = await ingredientService.updateIngredientById(
      IngredientId,
      updateData
    );
    res.json(updatedIngredient);
  } catch (error) {
    next(error);
  }
}

async function deleteIngredientById(req, res, next) {
  try {
    const { IngredientId } = req.params;
    if (!IngredientId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'IngredientId is required'
      );
    }
    if (Number.isNaN(IngredientId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'IngredientId must be a number'
      );
    }
    const deleteIngredient =
      await ingredientService.deleteIngredientById(IngredientId);
    if (!deleteIngredient) {
      throw errorResponder(errorTypes.NOT_FOUND, 'IngredientId not found');
    }
    res.json(deleteIngredient);
  } catch (error) {
    next(error);
  }
}

async function getIngredientByName(req, res, next) {
  try {
    const { IngredientName } = req.params;
    if (!IngredientName) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    const Ingredient = await ingredientService.getIngredientByName(IngredientName);
    if (Ingredient.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ingredient not found');
    }
    res.json(Ingredient);
  } catch (error) {
    next(error);
  }
}

async function getIngredientById(req, res, next) {
  try {
    const { IngredientId } = req.params;
    if (!IngredientId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Ingredient Id is required'
      );
    }
    if (Number.isNaN(IngredientId)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Ingredient Id must be a number'
      );
    }
    if (IngredientId > 1000) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Ingredient Id must be within the range of 1 to 1000' 
      );
    }
    const Ingredient = await ingredientService.getIngredientById(IngredientId); 
    if (Ingredient.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ingredient not found');
    }
    res.json(Ingredient);
  } catch (error) {
    next(error);
  }
}

async function getAllIngredient(req, res, next) {
  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;

    const ingredient = await ingredientService.getAllIngredient(offset, limit);
    res.json(ingredient);
  } catch (error) {
    next(error);
  }
}

async function getIngredientByvolume(req, res, next) {
  try {
    const { AlcoholByVolume } = req.params;
    if (!AlcoholByVolume) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Volume is required');
    }
    const Ingredient = await ingredientService.getIngredientByvolume(AlcoholByVolume);
    if (Ingredient.length === 0) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ingredient not found');
    }
    res.json(Ingredient);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createIngredient,
  updateIngredientById,
  deleteIngredientById,
  getIngredientByName,
  getIngredientById,
  getAllIngredient,
  getIngredientByvolume
};