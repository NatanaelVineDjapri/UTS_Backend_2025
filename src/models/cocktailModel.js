const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    CocktailId: {
      type: Number,
      required: true,
      unique: true,
    },
    DrinkAlternate: {
      type: String,
      required: false,
    },
    Tags: {
      type: String,
      required: false,
    },
    Category: {
      type: String,
      required: false,
    },
    IBA: {
      type: String,
      required: false,
    },
    Popular: {
      type: Boolean,
      default: false,
    },
    Alcoholic: {
      type: Boolean,
      required: true,
    },
    Glass: {
      type: String,
      required: true,
    },
    Flavour: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      require: false,
    },
    Intstructions: {
      type: String,
      required: true,
    },
    IntstructionsES: {
      type: String,
      required: true,
    },
    IntstructionsDE: {
      type: String,
      required: true,
    },
    IntstructionsFR: {
      type: String,
      required: false,
    },
    IntstructionsIT: {
      type: String,
      required: false,
    },
    IntstructionsZH_HANS: {
      type: String,
      required: false,
    },
    IntstructionsZH_HANT: {
      type: String,
      required: false,
    },
    DrinkThumb: {
      type: String,
      required: true,
    },
    Ingredient1: {
      type: String,
      required: false,
    },
    Ingredient2: {
      type: String,
      required: false,
    },
    Ingredient3: {
      type: String,
      required: false,
    },
    Ingredient4: {
      type: String,
      required: false,
    },
    Ingredient5: {
      type: String,
      required: false,
    },
    Ingredient6: {
      type: String,
      required: false,
    },
    Ingredient7: {
      type: String,
      required: false,
    },
    Ingredient8: {
      type: String,
      required: false,
    },
    Ingredient9: {
      type: String,
      required: false,
    },
    Ingredient10: {
      type: String,
      required: false,
    },
    Ingredient11: {
      type: String,
      required: false,
    },
    Ingredient12: {
      type: String,
      required: false,
    },
    Ingredient13: {
      type: String,
      required: false,
    },
    Ingredient14: {
      type: String,
      required: false,
    },
    Ingredient15: {
      type: String,
      required: false,
    },
    Measure1: {
      type: String,
      required: false,
    },
    Measure2: {
      type: String,
      required: false,
    },
    Measure3: {
      type: String,
      required: false,
    },
    Measure4: {
      type: String,
      required: false,
    },
    Measure5: {
      type: String,
      required: false,
    },
    Measure6: {
      type: String,
      required: false,
    },
    Measure7: {
      type: String,
      required: false,
    },
    Measure8: {
      type: String,
      required: false,
    },
    Measure9: {
      type: String,
      required: false,
    },
    Measure10: {
      type: String,
      required: false,
    },
    Measure11: {
      type: String,
      required: false,
    },
    Measure12: {
      type: String,
      required: false,
    },
    Measure13: {
      type: String,
      required: false,
    },
    Measure14: {
      type: String,
      required: false,
    },
    Measure15: {
      type: String,
      required: false,
    },
    ImageSource: {
      type: String,
      required: false,
    },
    ImageAttribution: {
      type: String,
      required: false,
    },
    CreativeCommonsConfirmed: {
      type: String,
      required: false,
    },
    dateModified: {
      type: Date,
      require: false,
    },
  },
  {
    versionKey: false,
  }
);

const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;
