//需先載入mongoose　才能使用相關方法
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
    name: {
        type: String, // 資料型別為字串
        required: true　//必填欄位
    }
})
　
//匯出，並把這份schema 命名為Todo
module.exports = mongoose.model('Todo', todoSchema)