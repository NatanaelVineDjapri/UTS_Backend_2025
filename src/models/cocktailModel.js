const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
    name: {
      type: [String],
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cocktailId: {
      type: Number,
      required: true,
      unique: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    Alcoholic: {
      type: [String],
      required: true,
    },
    Glass: {
      type: [String],
      required: true,
    },
    Intstructions: {
      type: [String],
      required: true,
    },
    IntstructionsES: {
      type: [String],
      required: true,
    },
    IntstructionsDE: {
      type: [String],
      required: true,
    },
    IntstructionsFR: {
      type: [String],
      required: true,
    },
    IntstructionsIT: {
      type: [String],
      required: true,
    },
    IntstructionsZH_HANS: {
      type: [String],
      required: null,
    },
    IntstructionsZH_HANT: {
      type: [String],
      required: true,
    },
    DrinkThumb: {
      type: [String],
      required: true,
    },
    Ingredient1: {
      type: [String],
      required: true,
    },
    Ingredient2: {
      type: [String],
      required: true,
    },
    Ingredient3: {
      type: [String],
      required: true,
    },
    Ingredient4: {
      type: [String],
      required: true,
    },
    Ingredient5: {
      type: [String],
      required: true,
    },
    Ingredient6: {
      type: [String],
      required: true,
    },
    Ingredient7: {
      type: [String],
      required: true,
    },
    Ingredient8: {
      type: [String],
      required: true,
    },
    Ingredient9: {
      type: [String],
      required: true,
    },
    Ingredient10: {
      type: [String],
      required: true,
    },
    Ingredient11: {
      type: [String],
      required: true,
    },
    Ingredient12: {
      type: [String],
      required: true,
    },
    Ingredient13: {
      type: [String],
      required: true,
    },
    Ingredient14: {
      type: [String],
      required: true,
    },
    Ingredient15: {
      type: [String],
      required: true,
    },
    Measure1: {
      type: [String],
      required: true,
    },
    Measure2: {
      type: [String],
      required: true,
    },
    Measure3: {
      type: [String],
      required: true,
    },
    Measure4: {
      type: [String],
      required: true,
    },
    Measure5: {
      type: [String],
      required: true,
    },
    Measure6: {
      type: [String],
      required: true,
    },
    Measure7: {
      type: [String],
      required: true,
    },
    Measure8: {
      type: [String],
      required: true,
    },
    Measure9: {
      type: [String],
      required: true,
    },
    Measure10: {
      type: [String],
      required: true,
    },
    Measure11: {
      type: [String],
      required: true,
    },
    Measure12: {
      type: [String],
      required: true,
    },
    Measure13: {
      type: [String],
      required: true,
    },
    Measure14: {
      type: [String],
      required: true,
    },
    Measure15: {
      type: [String],
      required: true,
    },
    ImageSource: {
      type: [String],
      required: true,
    },
    ImageAttribution: {
      type: [String],
      required: true,
    },
    CreativeCommonsConfirmed: {
      type: [String],
      required: true,
  }
    });

const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;
