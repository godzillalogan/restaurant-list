
db = require('../../config/mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const raw = require('../../restaurant.json')
const seed = raw.results



db.once('open', () => {
  seed.forEach(restaurant => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    });
  })
})