const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//新建內容
router.get('/new', (req, res) => {
    return res.render('new')
})

//新建資料並寫入資料庫
router.post('/', (req ,res) => {
    const name = req.body.name // 從 req.body 拿出
    return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//查看單筆資料
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(req.params.id)
    .lean()
    // .then((todo) => console.log(todo))
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//單筆資料編輯頁面
router.get('/:id/edit' , (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//修改單筆資料，並存回資料庫
router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    return Todo.findById(id)
    .then(todo => {
        todo.name = name
        todo.isDone = isDone === 'on' //先判斷是否嚴格等於'on'，則會回傳true並存回todo.isDone裡面
        return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router