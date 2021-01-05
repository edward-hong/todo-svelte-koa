const Router = require('@koa/router')

const {
  userTodos,
  addTodo,
  removeTodo,
  editTodo,
  completeTodo,
} = require('../controllers/todo')

const router = new Router({ prefix: '/todo' })

router.get('/', userTodos)
router.post('/add', addTodo)
router.delete('/remove', removeTodo)
router.put('/edit', editTodo)
router.put('/complete', completeTodo)

module.exports = router
