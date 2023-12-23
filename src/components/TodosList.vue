<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todos'

import TodoItem from './TodoItem.vue'
import AddTodo from './AddTodo.vue'

const store = useTodoStore()

const { todos, isLoading } = storeToRefs(store)

/**
 * Delete todo item.
 * @param id Todo item id
 */
const deleteTodo = async (id: number) => {
  await store.delete(id)
}

/**
 * Mark todo item as done.
 * @param id Todo item id
 */
const markTodoAsDone = async (id: number) => {
  await store.markAsDone(id)
}

/**
 * Load todos.
 */
const loadTodos = async () => {
  await store.load()
}

onMounted( () => {
  loadTodos()
})
</script>

<template>
  <AddTodo class="mb-14" />

  <div v-if="isLoading">
    <div class="flex justify-center items-center">
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      <span>Loading...</span>
    </div>
  </div>

  <div v-else-if="todos.length === 0">
    <div class="flex justify-center items-center text-sm italic text-black-400/20">
      <span>No todos found, let's create a new one!</span>
    </div>
  </div>

  <div v-else-if="todos.length > 0">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :key="todo.id" :todo="todo" @deleteTodo="deleteTodo" @markAsDone="markTodoAsDone" />
      </li>
    </ul>
  </div>
</template>