<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver
    @submit="onSubmit"
    class="flex flex-col gap-4 w-full sm:w-56"
  >
    <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" fluid />
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
        $form.username.error?.message
      }}</Message>

      <InputText name="password" type="password" placeholder="Password" fluid />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
        $form.password.error?.message
      }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" :disabled="isLoading" />
  </Form>

  <form class="form" action="">
    <fieldset class="form-section">
      <legend>Событие</legend>

      <label class="label" for="date-start">
        <span>Начало</span>

        <input
          id="date-start"
          name="date-start"
          type="datetime-local"
          v-model="form.dateStart"
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
          v-model="form.dateEnd"
          min="2018-06-07T00:00"
          required
        />
      </label>

      <label class="label" for="timezone">
        <span>Часовой пояс</span>

        <select name="timezone" id="timezone" v-model="form.timezone">
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
    <Button label="Submit" />
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, type Reactive } from 'vue'
import type { UserEvent } from '@/types'
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'

const initialValues = reactive<UserEvent>({
  title: '',
  desc: '',
  dateStart: '',
  dateEnd: '',
  timezone: '',
  remindValue: undefined,
  remindType: undefined,
  url: undefined,
  address: undefined,
})

const timezoneArr: Array<string> = Intl.supportedValuesOf('timeZone')
const remindType: Array<string> = ['Минуты', 'Часы', 'Дни']

const form: Reactive<UserEvent> = reactive({
  title: '',
  desc: '',
  dateStart: '',
  dateEnd: '',
  timezone: Intl.supportedValuesOf('timeZone')[0],

  remindValue: 2,
  remindType: 'hours',
})

const createEvent = () => {
  console.log(form)
}

const resolver = ({ values }: FormResolverOptions) => {
  const errors = {} as Record<keyof typeof initialValues, Array<Pick<Error, 'message'>>>

  if (!values.username) errors.username = [{ message: 'Username is required.' }]
  if (!values.password) errors.password = [{ message: 'Password is required.' }]

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onSubmit = async ({ valid, values }: FormSubmitEvent<UserEvent>) => {
  if (!valid) return

  const { username, password } = values
  if (!username || !password) return

  const url = 'http://localhost:3000/'
  let toastMsg: ToastMessageOptions = { life: 3000 }

  try {
    isLoading.value = true

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
      }),
    })

    console.log(res)

    toastMsg = {
      severity: 'success',
      summary: 'Form is submitted.',
    }
  } catch (err) {
    toastMsg = {
      severity: 'error',
      summary: (err as Error).message,
    }
  } finally {
    isLoading.value = false
  }

  toast.add(toastMsg)
}

onMounted(() => {
  console.log(Intl.supportedValuesOf('timeZone'))
})
</script>

<style scoped></style>
