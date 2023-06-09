const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
  place: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  schedule: {
    type: Object,
    properties: {
      'open': Number,
      'close': Number
    }
  }
}, { strict: false });

const Places = mongoose.model("places_db", placesSchema, "places_db");
module.exports = { Places };