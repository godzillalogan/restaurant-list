
# 餐廳首頁

![餐廳首頁](/README/RestaurantIndex.PNG)

* 使用者可以在首頁看到所有餐廳與它們的簡單資料：

    * 餐廳照片

    * 餐廳名稱

    * 餐廳分類 :中東料理、美式、咖啡、日本料理、義式餐廳、酒吧

    * 餐廳評分: 最高5分

* 使用者可以透過搜尋餐廳名稱來找到特定的餐廳
* 使用者可以四種排序方式來排列餐廳的順序
* 使用者可以註冊帳號
* 使用者也可以透過 Facebook Login 直接登入

# 餐廳的詳細資料

![餐廳首頁](/README/ShowIndex.PNG)

* 使用者可以再點進去看餐廳的詳細資訊：

    * 類別 : 中東料理、美式、咖啡、日本料理、義式餐廳、酒吧

    * 地址 : 點地址後面的符號可以連到google map

    * 電話

    * 描述

    * 圖片
# 環境建置
* bcryptjs: 2.4.3
* body-parser: 1.19.0
* connect-flash: 0.1.1
* dotenv: 10.0.0
* express: 4.17.1
* express-handlebars: 5.3.2
* express-session: 1.17.2
* method-override: 3.0.0
* mongoose: 5.13.2
* passport: 0.4.1
* passport-facebook: 3.0.0
* passport-local: 1.0.0
# CRUD功能
* Create: 使用者點擊右上角**新增餐廳**使用者可以增加一間餐廳
* Read: 使用者可以瀏覽全部餐廳，點擊餐廳照片可以瀏覽餐廳詳細資料
* Update: 使用者點可以點擊**Edit**重新編輯一家餐廳的資料
* Delete: 使用者可以點擊**Delete**刪除餐廳

# 使用方法
1. 終端機輸入指令
`git clone https://github.com/godzillalogan/restaurant-list.git`
2. 進入專案
`cd restaurant-list`
3. 安裝相關套件
`npm install`
4. 新增種子資料
`npm run seed`
5. 開啟專案
`npm run dev`
6. 出現以下訊息就可以在[localhost:3000](localhost:3000)開啟本專案
`Express is listening on localhost:3000`