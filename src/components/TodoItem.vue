<script setup lang="ts">
import type { ITodo } from '../types/ITodo'
import { defineProps, defineEmits } from 'vue'
import { TrashIcon, CheckIcon } from '@heroicons/vue/24/outline'

const emits = defineEmits(['deleteTodo', 'markAsDone'])

const props = defineProps({
  todo: {
    type: Object as () => ITodo,
    required: true
  }
})

/**
 * Delete todo item
 */
const deleteTodo = () => {
  emits('deleteTodo', props.todo.id)
}

/**
 * Mark todo item as done
 */
const markAsDone = () => {
  emits('markAsDone', props.todo.id)
}
</script>

<template>
  <li class="bg-stone-200 hover:bg-stone-300 border-2 border-stone-300 w-full rounded-md flex items-center p-2 m-2">
    <div>
      <button v-if="!props.todo.isDone"
        class="bg-green-600 hover:bg-green-500 text-white p-0.5 rounded-md text-sm focus:outline-none focus:shadow-outline"
        @click="markAsDone">
        <div class="flex">
          <i class="w-4 h-4">
            <CheckIcon />
          </i>
        </div>
      </button>
      <button v-else-if="props.todo.isDone" disabled
        class=" p-0.5 rounded-sm text-sm focus:outline-none focus:shadow-outline">
        <div class="flex">
          <i class="w-4 h-4">
            <CheckIcon />
          </i>
        </div>
      </button>

    </div>
    <span :class="{ 'line-through opacity-25': props.todo.isDone }" class="text-lg w-full mx-4">{{ props.todo.text }}</span>
    <div class="mt-10">
      <button
        class="hover:text-white hover:bg-rose-500 p-1 rounded-sm text-xs focus:outline-none focus:shadow-outline"
        @click="deleteTodo">
        <div class="flex items-center">
          <i class="w-5 h-5">
            <TrashIcon />
          </i>
          <span class="ml-2">Delete</span>
        </div>
      </button>
    </div>
  </li>
</template>