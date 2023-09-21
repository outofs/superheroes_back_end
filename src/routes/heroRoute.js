const express = require('express');
const heroController = require('../controller/heroController')

const router = express.Router();

router.get("/", heroController.getManyHeroes);
router.get("/:id", heroController.getHeroById);
router.post("/", heroController.createHero);

router.patch("/:id", heroController.updateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;