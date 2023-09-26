const Hero = require("../models/heroModel");
const catchAsync = require("../utils/catchAsync");
const { makeTempImgUrl, deleteFile } = require('../utils/AWSclient');

exports.getMany = () => catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = 5;

  const totalHeroesQuantity = await Hero.find().count();

  const heroes = await Hero.find({})
    .skip(perPage * (page - 1))
    .limit(perPage);

  if (!totalHeroesQuantity) {
    res.status(404).send("Not found");
  }

  for (const hero of heroes) {
    const heroImgsUrl = hero.images.map(async (img) => {
      return await makeTempImgUrl(img);
    });

    const result = await Promise.all(heroImgsUrl);

    hero.images = result;
  }

  res.status(200).json({
    heroes: heroes,
    totalHeroesQuantity,
  });
})

exports.getOne = () => catchAsync(async (req, res) => {
  const hero = await Hero.findById(req.params.id);

  if (!hero) {
    res.status(404).send("Not found");
  }

  const heroImgsUrl = hero.images.map(async (img) => {
    return await makeTempImgUrl(img);
  });

  const result = await Promise.all(heroImgsUrl);

  hero.images = result;

  res.status(200).json(hero);
});


exports.createOne = () => catchAsync(async (req, res) => {
  const heroFields = [
    "nickname",
    "real_name",
    "origin_description",
    "superpowers",
    "catch_phrase",
    "images",
  ];

  if (heroFields.some((field) => !req.body[field])) {
    res.status(400).send("Bad request");
  }

  const newHero = await Hero.create(req.body)

  res.status(201).json(newHero);
});

exports.deleteOne = () => catchAsync(async (req, res) => {
  const hero = await Hero.findByIdAndDelete(req.params.id);

  if (!hero) {
    res.status(404).send("Not found");
  }

  const deletingImgs = hero.images.map(async (img) => {
    return await deleteFile(img);
  });

  await Promise.all(deletingImgs);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateOne = () =>
  catchAsync(async (req, res) => {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hero) {
      res.status(404).send("Not found");
    }

    res.status(200).json(hero);
  });