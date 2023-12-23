<script setup lang="ts">
import Todos from './../components/TodosList.vue'

</script>

<template>
  <main class="pt-10">
    <h1 class="text-sky-400/100 text-4xl font-bold text-center mb-4">TaskWhiz - Your ToDo list</h1>
    <p class="text-2xl font-light text-center mb-8">Your daily Todo app</p>
    <div class="flex flex-wrap justify-center">
      <div class="w-full md:w-1/2">
        <Todos />
      </div>
    </div>
  </main>
</template>
