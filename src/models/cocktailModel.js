const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  ingredients: {
    type: [String],
    required: true,
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
  popular:{
    type : Boolean,
    default: false,
  },
  country:{
    type:[String],
    require : true
  },
  glass:{
    type:[String],
    require : true
  },
  flavour:{
    type:[String],
    require : true
  }
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);
module.exports = Cocktail;
