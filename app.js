const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo') // 載入Todo model
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/todo-list' , {useNewUrlParser: true, useUnifiedTopology: true}) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection;

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

// 樣板引擎相關設定(先命名為hbs, 之後是exphbs的相關參數設定)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// 啟用樣板引擎(也可以只寫啟用的部分，推測沒寫設定應該會有預設值或是就沒有設定了(?))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

//根目錄localhost:3000
app.get('/', (req, res) => {
    Todo.find() // 取出Todo model 裡的所有資料
    .lean()
    .then(todos => res.render('index', { todos: todos })) //渲染樣板，並把資料傳給樣板
    // res.render('index')
    .catch(error => console.error(error)) //錯誤處理
})

//新建內容
app.get('/todos/new', (req, res) => {
    return res.render('new')
})

//新建資料並寫入資料庫
app.post('/todos', (req ,res) => {
    const name = req.body.name // 從 req.body 拿出
    return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//查看單筆資料
app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(req.params.id)
    .lean()
    // .then((todo) => console.log(todo))
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit' , (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    return Todo.findById(id)
    .then(todo => {
        todo.name = name
        return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`)
})