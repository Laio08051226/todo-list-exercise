const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/todo-list' , {useNewUrlParser: true, useUnifiedTopology: true}) // 設定連線到 mongoDB
const db = mongoose.connection;

// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db