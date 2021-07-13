// 引用 Express 與 Express 路由器
const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


//Create
router.get('/restaurants/new',(req,res) =>{
  return res.render('new')
})
router.post('/restaurants',(req,res) =>{
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))

})
////Read
//params, 用:代表變數
router.get('/restaurants/:id',(req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
////Update
router.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/restaurants/:id',(req,res) => {
  const id = req.params.id
  const name = req.body.name 
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant =>{
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

////delete
router.delete('/restaurants/:id',(req, res) =>{
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
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
  // return Restaurant.find()
  //箭頭函式
  //req.query 可以得到 EX:  req.query {keyword:'jurassic'},網址上?之後的內容可以透過req.query取得
  //toLowerCase()輸入大小寫都可以搜尋的到
  // const restaurants = restaurantsList.results.filter(restaurant => 
  //   restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
  //   restaurant.name_en.toLowerCase().includes(req.query.keyword.toLowerCase())  ||
  //   restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  // )
  //keyword: req.query.keyword  可以保留搜尋的文字在input裡面
  // res.render('index', { restaurants: restaurants, keyword: req.query.keyword})
})



module.exports = router