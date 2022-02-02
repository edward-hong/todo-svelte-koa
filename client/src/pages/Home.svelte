<script>
  import axios from 'axios'
  import router from 'page'

  import { isAuth } from '../utils/helpers'
  import {
    SIGNIN_PATH,
    DEV_SERVER_URL,
    PROD_SERVER_URL,
    TODOS_SERVER_PATH,
    ADD_TODO_SERVER_PATH,
    REMOVE_TODO_SERVER_PATH,
    EDIT_TODO_SERVER_PATH,
    COMPLETE_TODO_SERVER_PATH,
  } from '../constants'

  if (!isAuth()) {
    router.redirect(SIGNIN_PATH)
  }

  export let token

  let todos = []
  let completedTodos = []
  let addTodo = ''
  let tempTodo = ''

  const userEmail = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : null

  async function getTodos() {
    const response = await axios({
      method: 'GET',
      url: `${
        isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
      }${TODOS_SERVER_PATH}`,
      params: { userEmail },
    })

    todos = response.data.todos
      .map((todo) => {
        todo.isEdit = false
        return todo
      })
      .filter((todo) => {
        return !todo.completed
      })
      .reverse()
    completedTodos = response.data.todos
      .map((todo) => {
        todo.isEdit = false
        return todo
      })
      .filter((todo) => {
        return todo.completed
      })
      .reverse()
  }

  getTodos()

  async function handleAdd() {
    if (addTodo) {
      const response = await axios({
        method: 'POST',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${ADD_TODO_SERVER_PATH}`,
        data: { userEmail, todo: addTodo },
      })

      const newTodo = response.data.todo
      newTodo.isEdit = false

      todos = [...todos, newTodo]
      addTodo = ''
    }
  }

  function handleEditMode(i) {
    return function () {
      todos[i].isEdit ? (tempTodo = '') : (tempTodo = todos[i].todo)
      todos = [
        ...todos.slice(0, i),
        { ...todos[i], isEdit: !todos[i].isEdit },
        ...todos.slice(i + 1),
      ]
    }
  }

  function handleEdit(i, todo) {
    return async function () {
      await axios({
        method: 'PUT',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${EDIT_TODO_SERVER_PATH}`,
        data: { todo: todo.todo, editedTodo: tempTodo, userEmail },
      })

      todos = [
        ...todos.slice(0, i),
        { ...todos[i], todo: tempTodo, isEdit: !todos[i].isEdit },
        ...todos.slice(i + 1),
      ].reverse()
    }
  }

  function handleComplete(i, todo) {
    return async function () {
      await axios({
        method: 'PUT',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${COMPLETE_TODO_SERVER_PATH}`,
        data: { todo: todo.todo },
      })
      completedTodos = [...completedTodos, todo]
      todos = [...todos.slice(0, i), ...todos.slice(i + 1)]
    }
  }

  function handleDelete(i, todo, completed) {
    return async function () {
      await axios({
        method: 'DELETE',
        url: `${
          isProduction ? PROD_SERVER_URL : DEV_SERVER_URL
        }${REMOVE_TODO_SERVER_PATH}`,
        data: { todo },
      })

      if (completed) {
        completedTodos = [
          ...completedTodos.slice(0, i),
          ...completedTodos.slice(i + 1),
        ]
      } else {
        todos = [...todos.slice(0, i), ...todos.slice(i + 1)]
      }
    }
  }
</script>

<style>
  .list-group {
    margin-bottom: 1rem;
    border: 1px solid #e6e6e6;
    border-radius: 0;
    background: #fefefe;
    box-shadow: none;
    overflow: hidden;
    color: #0a0a0a;
    margin-left: 0;
  }

  .list-group > :last-child {
    margin-bottom: 0;
  }

  .list-group-item {
    padding: 1rem;
    border-bottom: 1px solid #e6e6e6;
    line-height: 41.5px;
  }

  .list-group-item div {
    float: right;
  }

  .list-group-item > :last-child {
    margin-bottom: 0;
    border-bottom: none;
  }

  .list-group-item:hover,
  .list-group-item:focus {
    background-color: #e6e6e6;
  }

  .list-group-item.disabled,
  .list-group-item.disabled:hover,
  .list-group-item.disabled:focus,
  .list-group-item[disabled],
  .list-group-item[disabled]:hover,
  .list-group-item[disabled]:focus {
    color: #8a8a8a;
    cursor: not-allowed;
    background-color: #fefefe;
  }
</style>

<h1 class="text-center">Todos</h1>
<div class="grid-x padding-x">
  <div class="cell small-10 small-offset-1 large-8 large-offset-2">
    <div class="input-group">
      <input
        type="text"
        class="input-group-field"
        placeholder="Add Todo"
        bind:value={addTodo} />
      <div class="input-group-button">
        <button on:click={handleAdd} class="button">
          <i class="fi-plus" />
        </button>
      </div>
    </div>
  </div>
</div>

<div class="grid-x padding-x">
  <div class="cell small-10 small-offset-1 large-8 large-offset-2">
    <ul class="list-group">
      {#each todos as todo, i (todo)}
        <li class:disabled={todo.completed} class="list-group-item">
          {#if todo.isEdit}
            <div class="input-group">
              <input
                type="text"
                class="input-group-field"
                placeholder="Edit Todo"
                bind:value={tempTodo} />
              <div class="input-group-button">
                <button on:click={handleEdit(i, todo)} class="button warning">
                  <i class="fi-pencil" />
                </button>
              </div>
            </div>
          {:else}
            {todo.todo}
            <div class="button-group">
              <button on:click={handleComplete(i, todo)} class="button success">
                <i class="fi-check" />
              </button>
              <button on:click={handleEditMode(i)} class="button warning">
                <i class="fi-pencil" />
              </button>
              <button
                on:click={handleDelete(i, todo, false)}
                class="button alert">
                <i class="fi-trash" />
              </button>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
</div>

<h2 class="text-center">Completed</h2>

<div class="grid-x padding-x">
  <div class="cell small-10 small-offset-1 large-8 large-offset-2">
    <ul class="list-group">
      {#each completedTodos as todo, i (todo)}
        <li class:disabled={todo.completed} class="list-group-item">
          {todo.todo}
          <div class="button-group">
            <button on:click={handleDelete(i, todo, true)} class="button alert">
              <i class="fi-trash" />
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>
