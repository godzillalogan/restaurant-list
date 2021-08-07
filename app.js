////外部現成套件
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars') //沒有給 ./ ，代表去node_modules裡面去找
const bodyParser = require('body-parser') //body-Parser
const methodOverride = require('method-override') 
const flash = require('connect-flash')

////引用的設定
const usePassport = require('./config/passport')
const routes = require('./routes')  // 引用路由器
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const PORT = process.env.PORT
const app = express()



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))



// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// setting static files
app.use(express.static('public'))

// setting template engine, extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.engine('hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs', 
  helpers: require('./hbsHelpers/handlebarsHelpers')
}))
app.set('view engine', 'hbs')

usePassport(app) //// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前

app.use(flash())

app.use((req, res, next) => {   //放在usePassport(app) 之後、app.use(routes) 之前
  res.locals.isAuthenticated = req.isAuthenticated() //locals是指會把這些參數直接放到回應的data裡面的東西
  res.locals.user = req.user  //反序列化時，取出的user資訊
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})


app.use(routes)  // 將 request 導入路由器


// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})