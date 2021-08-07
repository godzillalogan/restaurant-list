////外部現成套件
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars') //沒有給 ./ ，代表去node_modules裡面去找
const usePassport = require('./config/passport')
const bodyParser = require('body-parser') //body-Parser
const methodOverride = require('method-override') 

////引用的設定
const routes = require('./routes')  // 引用路由器
require('./config/mongoose')


const port = 3000
const app = express()

usePassport(app)

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// setting static files
app.use(express.static('public'))
app.use(routes)  // 將 request 導入路由器
// setting template engine, extname: '.hbs'，是指定副檔名為 .hbs，有了這行以後，我們才能把預設的長檔名改寫成短檔名
app.engine('hbs', exphbs({ 
  defaultLayout: 'main', 
  extname: '.hbs', 
  helpers: require('./hbsHelpers/handlebarsHelpers')
}))
app.set('view engine', 'hbs')


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})