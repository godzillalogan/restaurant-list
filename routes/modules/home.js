// 引用 Express 與 Express 路由器
const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


// routes setting
router.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

//search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurants =>{
      if (keyword) {
        restaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword)  ||
          restaurant.category.toLowerCase().includes(keyword)
        )
      }
      res.render('index',{restaurants})
    })
    .catch(error => console.log(error))
})



module.exports = router