import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ITodo } from '../types/ITodo'
import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_BASE_URL

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      /**
       * The todos array. This is a reactive array of ITodo objects.
       */
      todos: reactive<ITodo[]>([]),
      /**
       * A boolean indicating if the todos are loading. This is a ref boolean.
       */
      isLoading: ref(false)
    }
  },

  actions: {
    /**
     * Load todos from the API. This is an async action that will set the todos and isLoading properties.
     */
    async load() {
      let response
      this.isLoading = true

      try {
        response = await axios.get(`${baseURL}/todo`)
      } catch (error) {
        console.log(error)
      }

      if (response && response?.status === 200 && Array.isArray(response?.data))
        this.todos = response.data
          .map((todo) => ({ ...todo, loading: false }))
          .sort((a, b) => b.id - a.id)

      this.isLoading = false
    },
    /**
     * Add a new todo to the API. This is an async action that will add the todo to the todos array.
     * @param text Add a new todo to the API. This is an async action that will add the todo to the todos array.
     */
    async add(text: string) {
      let response

      try {
        response = await axios.post(`${baseURL}/todo`, { text })
      } catch (error) {
        console.log(error)
      }
      if (response?.status === 201) {
        const todo = response.data
        this.todos.unshift(todo)
      }
    },
    /**
     * Delete a todo from the API. This is an async action that will remove the todo from the todos array.
     * @param id The id of the todo to delete.
     */
    async delete(id: number) {
      let response

      try {
        response = await axios.delete(`${baseURL}/todo/${id}`)
      } catch (error) {
        console.log(error)
      }

      if (response && response?.status === 200) {
        const index = this.todos.findIndex((todo) => todo.id === id)
        if (index > -1) this.todos.splice(index, 1)
      }
    },
    /**
     * Mark a todo as done. This is an async action that will update the todo in the todos array.
     * @param id The id of the todo to mark as done.
     */
    async markAsDone(id: number) {
      let response

      try {
        response = await axios.put(`${baseURL}/todo/${id}`, { isDone: true })
      } catch (error) {
        console.log(error)
      }

      if (response && response?.status === 200) {
        const index = this.todos.findIndex((todo) => todo.id === id)
        if (index > -1) this.todos[index].isDone = true
      }
    }
  }
})
