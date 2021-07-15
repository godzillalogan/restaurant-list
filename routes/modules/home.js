// 引用 Express 與 Express 路由器
const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')
const sotData = require('../../config/sortData.json')


// routes setting
router.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

//search
router.get('/search', (req, res) => {
  const searchInput = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  const currentSortOption = req.query.sortOption
  const sortMongoose = {
    englishNameAsc:{name_en:'asc'},
    englishNameDesc: { name_en: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortMongoose[currentSortOption])
    .then(restaurants =>{
      if (keyword) {
        restaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword)  ||
          restaurant.category.toLowerCase().includes(keyword)
        )
      }
      res.render('index',{restaurants,sorData,currentSortOption,sea})
    })
    .catch(error => console.log(error))
})



module.exports = router