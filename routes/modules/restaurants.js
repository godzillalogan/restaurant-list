// 引用 Express 與 Express 路由器
const express = require('express')

const router = express.Router()

const Restaurant = require('../../models/restaurant')


//Create
router.get('/restaurants/new',(req,res) =>{
  return res.render('new')
})
router.post('/restaurants',(req,res) =>{

  const {name, name_en, category, image, location , phone, google_map, rating, description} = req.body
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
  /////解構賦值
  const {name, name_en, category, image, location , phone, google_map, rating, description} = req.body
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

module.exports = router