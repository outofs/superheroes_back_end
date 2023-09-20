const heroService = require('../services/heroService'); 



exports.getHeroById = heroService.getOne();

exports.createHero = heroService.createOne();

exports.deleteHero = heroService.deleteOne();

exports.updateHero = heroService.updateOne(); 