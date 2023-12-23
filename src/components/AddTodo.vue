<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todos'
import { PlusIcon } from '@heroicons/vue/24/outline'

const store = useTodoStore()

const todoText = ref('')

/**
 * Add todo item.
 */
const addTodo = async () => {
  await store.add(todoText.value)
  todoText.value = ''
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-full mx-4">
      <input
        class="focus:shadow-lg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Enter something great to do today ✨ "
        v-model="todoText"
        @keyup.enter="addTodo"
      />
    </div>

    <div class="flex justify-center px-2">
      <button
        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
        type="button"
        @click="addTodo"
        :disabled="todoText.length === 0"
      >
        <div class="flex">
          <i class="w-6 h-6">
            <PlusIcon />
          </i>
          <span class="ml-2">Add</span>
        </div>
      </button>
    </div>
  </div>
</template>
