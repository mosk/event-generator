<template>
  <main class="w-full flex">
    <div class="w-1/2">
      <CreateEvent />
    </div>

    <div class="w-1/2">
      <EventsList />
    </div>
  </main>
</template>

<script setup lang="ts">
// import PageDescription from './components/PageDescription.vue'
import CreateEvent from './components/forms/CreateEvent.vue'
import EventsList from './components/events/EventsList.vue'
// import AuthForm from './components/AuthForm.vue'
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
