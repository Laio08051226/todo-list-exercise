// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {
    Todo.find() // 取出Todo model 裡的所有資料
    .lean()
    .sort({ _id: 'asc' }) // 根據 _id 升冪排序, 反之用 desc00
    .then(todos => res.render('index', { todos })) //渲染樣板，並把資料傳給樣板
    .catch(error => console.error(error)) //錯誤處理
})

// 匯出路由模組
module.exports = router