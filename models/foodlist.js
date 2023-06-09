const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  place: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  weigh: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { strict: false });

const FoodList = mongoose.model("foodlist_db", foodSchema, 'foodlist_db');
module.exports = { FoodList };