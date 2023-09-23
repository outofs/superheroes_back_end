const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "A superhero must have a nickname"],
    unique: true,
  },
  real_name: {
    type: String,
    required: [true, "A superhero must have a real name"]
  },
  origin_description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  superpowers: [{
    type: String,
    required: [true, "A superhero must have a superpower"]
  }],
  catch_phrase: {
    type: String,
    required: [true, "A superhero must have a catch phrase"]
  },
  images: [{
    type: String,
    required: true
  }],
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;