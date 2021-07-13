const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
// require express-handlebars here
//沒有給 ./ ，代表去node_modules裡面去找
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser') //body-Parser

const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')
// const restaurant = require('./models/restaurant')


const port = 3000
const app = express()

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurantCRUD', { useNewUrlParser: true, useUnifiedTopology: true }) 

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine, extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// routes setting
app.get('/', (req, res) => {

  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})
//Create
app.get('/restaurants/new',(req,res) =>{
  return res.render('new')
})
app.post('/restaurant',(req,res) =>{
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
app.get('/restaurant/:id',(req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
////Update
app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:id/edit',(req,res) => {
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
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

////delete
app.post('/restaurant/:id/delete',(req, res) =>{
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//search
app.get('/search', (req, res) => {
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



// setting static files
app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})