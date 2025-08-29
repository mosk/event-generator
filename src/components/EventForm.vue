<template>
  <form class="form" action="">
    <fieldset class="form-section">
      <legend>Событие</legend>

      <label class="label" for="date-start">
        <span>Начало</span>

        <input
          id="date-start"
          name="date-start"
          type="datetime-local"
          value="2018-06-12T19:30"
          min="2018-06-07T00:00"
          required
        />
      </label>

      <label class="label" for="date-end">
        <span>Окончание</span>

        <input
          id="date-end"
          name="date-end"
          type="datetime-local"
          value="2018-06-12T19:30"
          min="2018-06-07T00:00"
          required
        />
      </label>

      <label class="label" for="timezone">
        <span>Часовой пояс</span>

        <select name="timezone" id="timezone">
          <option :value="value" :key="value" v-for="value in timezoneArr">{{ value }}</option>
        </select>
      </label>

      <label class="label" for="title">
        <span>Заголовок</span>

        <input
          v-model="form.title"
          id="title"
          name="title"
          type="text"
          placeholder="Текст заголовка"
        />
      </label>

      <label class="label" for="desc">
        <span>Описание</span>

        <textarea
          v-model="form.desc"
          id="desc"
          name="desc"
          placeholder="Текст заголовка"
        ></textarea>
      </label>

      <label class="label" for="url">
        <span>Ссылка на сайт</span>

        <input
          v-model="form.url"
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          pattern="https://.*"
        />
      </label>

      <label class="label" for="address">
        <span>Адрес</span>

        <input
          v-model="form.address"
          id="address"
          name="address"
          type="text"
          placeholder="Бейкер-стрит, 221B, Лондон"
        />
      </label>
    </fieldset>

    <fieldset class="form-section">
      <legend>Напомнить о событии за</legend>

      <input id="remind-value" name="remind-value" type="number" placeholder="2" />

      <select name="remind-type" id="remind-type">
        <option :value="value" :key="value" v-for="value in remindType">{{ value }}</option>
      </select>
    </fieldset>

    <button type="button" @click="createEvent">Создать событие</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, type Reactive } from 'vue'

type TForm = {
  title: string
  desc: string
  dateStart: string
  dateEnd: string
  timezone: string

  remindValue: number
  remindType: string

  url?: string
  address?: string
}

const timezoneArr: Array<string> = Intl.supportedValuesOf('timeZone')
const remindType: Array<string> = ['Минуты', 'Часы', 'Дни']

const form: Reactive<TForm> = reactive({
  title: '',
  desc: '',
  dateStart: '',
  dateEnd: '',
  timezone: '',

  remindValue: 2,
  remindType: 'hours',
})

const createEvent = () => {
  console.log(form)
}

onMounted(() => {
  console.log(Intl.supportedValuesOf('timeZone'))
})
</script>

<style scoped>
.form {
  margin: 0;
  padding: 0;

  .form-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0;
    padding: 16px;
    gap: 8px;
    border: unset;
    border: 1px solid grey;
  }
}

.label {
  display: flex;
  flex-wrap: wrap;

  span {
    width: 100%;
  }

  input,
  select,
  textarea {
    width: 100%;
  }

  /* &[for*='date-'] {
    background-color: red;
  } */

  &[for='timezone'],
  &[for='title'],
  &[for='desc'] {
    grid-column: 1 / span 2;
  }
}
</style>
