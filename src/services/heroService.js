const Hero = require('../models/heroModel');
const catchAsync = require('../utils/catchAsync');

exports.getOne = () => catchAsync(async (req, res) => {
  const hero = await Hero.findById(req.params.id);

  if (!hero) {
    res.status(404).send("Not found");
  }

  res.status(200).json({
    status: 'success',
    data: hero,
  });
});


exports.createOne = () => catchAsync(async (req, res) => {
  const newHero = await Hero.create(req.body)

  res.status(201).json({
    status: 'success',
    data: newHero,
  });
});

exports.deleteOne = () => catchAsync(async (req, res) => {
  const hero = await Hero.findByIdAndDelete(req.params.id);

  if (!hero) {
    res.status(404).send("Not found");
  }

  res.status(204).json({
    status: 'success',
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

    res.status(200).json({
      status: 'success',
      data: hero,
    });
  });