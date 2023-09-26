const multer = require("multer");
const sharp = require("sharp");

const heroService = require("../services/heroService");
const catchAsync = require("../utils/catchAsync");
const { sendFile } = require('../utils/AWSclient');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else
    callback(
      false
    );
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadHeroImages = upload.fields([
  { name: "images", maxCount: 5 },
]);

exports.resizeHeroImages = catchAsync(async (req, res, next) => {
  if (!req.files.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const imageFilename = `hero-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      const buffer = await sharp(file.buffer)
        .resize(1000, 1000)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toBuffer();

      await sendFile(imageFilename, buffer, file.mimetype);

      req.body.images.push(imageFilename);
    })
  );

  next();
});

exports.getManyHeroes = heroService.getMany();

exports.getHeroById = heroService.getOne();

exports.createHero = heroService.createOne();

exports.deleteHero = heroService.deleteOne();

exports.updateHero = heroService.updateOne(); 