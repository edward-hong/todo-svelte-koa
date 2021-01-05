const Todo = require('../models/todo')

exports.userTodos = async (ctx) => {
  try {
    const todos = await Todo.query('userEmail')
      .eq(ctx.request.query.userEmail)
      .using('userEmail-index')
      .all()
      .exec()

    ctx.body = { todos }
  } catch (err) {
    ctx.body = { error: err.message }
  }
}

exports.addTodo = async (ctx) => {
  const { todo, userEmail } = ctx.request.body

  const newTodo = new Todo({ todo, userEmail })

  try {
    const savedTodo = await newTodo.save()
    savedTodo.completed = false

    ctx.body = {
      todo: savedTodo,
      messaage: 'Todo added successfully',
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = 'Todo add failed'
  }
}

exports.removeTodo = async (ctx) => {
  try {
    await Todo.delete(ctx.request.body.todo)

    ctx.body = {
      messaage: 'Todo removed successfully',
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = 'Todo remove failed'
  }
}

exports.editTodo = async (ctx) => {
  const { todo, editedTodo, userEmail } = ctx.request.body

  try {
    const foundTodo = await Todo.get(todo)

    if (foundTodo) {
      const completed = foundTodo.completed

      await Todo.delete(todo)

      const newTodo = new Todo({ todo: editedTodo, completed, userEmail })

      const updatedTodo = await newTodo.save()

      ctx.body = {
        updatedTodo,
        message: 'Todo edited successfully',
      }
    } else {
      ctx.status = 400
      ctx.body = 'Todo not found'
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = 'Todo edit failed'
  }
}

exports.completeTodo = async (ctx) => {
  const todo = ctx.request.body.todo
  try {
    await Todo.update({ todo, completed: true })

    ctx.body = {
      todo,
      message: 'Todo completed successfully',
    }
  } catch (err) {
    console.log(err)
    ctx.status = 400
    ctx.body = 'Todo edit failed'
  }
}
