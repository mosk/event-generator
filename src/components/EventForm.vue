<template>
  <form action="">
    <p>Событие</p>

    <div class="dates">
      <label for="date-start">Начало</label>
      <input
        id="date-start"
        name="date-start"
        type="datetime-local"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
      />

      <label for="date-end">Окончание</label>
      <input
        id="date-end"
        name="date-end"
        type="datetime-local"
        value="2018-06-12T19:30"
        min="2018-06-07T00:00"
      />
    </div>

    <label for="timezone">Часовой пояс</label>
    <select name="timezone" id="timezone">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </form>
</template>

<script setup lang="ts"></script>

<style scoped></style>
