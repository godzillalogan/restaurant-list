// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')




router.use('/users', users)

// 匯出路由器
module.exports = router

router.use('/', authenticator, restaurants)
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home)