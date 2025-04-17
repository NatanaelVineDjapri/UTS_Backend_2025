const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    IngredientId: {
      type: Number,
      required: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      required: false,
    },
    Type: {
      type: String,
      required: false,
    },
    Alcohol: {
      type: Boolean,
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
