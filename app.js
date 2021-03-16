const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const app = express();
const port = 3000;

require('./config/mongoose')
// mongoose.connect('mongodb://localhost/todo-list' , {useNewUrlParser: true, useUnifiedTopology: true}) // 設定連線到 mongoDB

// // 取得資料庫連線狀態
// const db = mongoose.connection;

// // 連線異常
// db.on('error', () => {
//     console.log('mongodb error!')
// })

// // 連線成功
// db.once('open', () => {
//     console.log('mongodb connected!')
// })

// 樣板引擎相關設定(先命名為hbs, 之後是exphbs的相關參數設定)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎(也可以只寫啟用的部分，推測沒寫設定應該會有預設值或是就沒有設定了(?))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})