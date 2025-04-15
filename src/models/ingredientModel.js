const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    IngredientId: {
      type: Number,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: true,
    },
    Alcohol: {
      type: String,
      required: true,
    },
    AlcoholByVolume: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
