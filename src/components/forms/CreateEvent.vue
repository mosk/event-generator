<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver
    @submit="onSubmit"
    class="flex flex-wrap p-8 pt-12 gap-y-10 w-full m-auto"
  >
    <FloatLabel class="w-full">
      <InputText
        v-model="form.title"
        name="title"
        type="text"
        placeholder="Хоп хэй лала лэй"
        fluid
        autofocus
      />
      <label for="title">Заголовок</label>
    </FloatLabel>

    <FloatLabel class="w-full">
      <Textarea
        v-model="form.desc"
        name="desc"
        rows="3"
        placeholder="Всё так и не так, и как будто бы пустяк..."
        fluid
      />
      <label for="title">Описание</label>
    </FloatLabel>

    <div class="flex w-full gap-x-4">
      <FloatLabel class="w-1/2">
        <InputText
          v-model="form.url"
          name="url"
          type="url"
          placeholder="https://example.com"
          fluid
          pattern="https://.*"
        />
        <label for="title">Ссылка на сайт</label>
      </FloatLabel>

      <FloatLabel class="w-1/2">
        <InputText
          v-model="form.address"
          name="address"
          type="text"
          placeholder="Бейкер-стрит, 221B, Лондон"
          fluid
        />
        <label for="title">Адрес</label>
      </FloatLabel>
    </div>

    <div class="flex w-full gap-x-4">
      <FloatLabel class="w-1/2">
        <DatePicker
          v-model="form.dateStart"
          inputId="dateStart"
          showTime
          hourFormat="24"
          iconDisplay="input"
          variant="filled"
          class="w-full"
        />
        <label for="dateStart">Начало</label>
      </FloatLabel>

      <FloatLabel class="w-1/2">
        <DatePicker
          v-model="form.dateEnd"
          inputId="dateEnd"
          showTime
          hourFormat="24"
          iconDisplay="input"
          variant="filled"
          class="w-full"
        />
        <label for="dateEnd">Конец</label>
      </FloatLabel>
    </div>

    <FloatLabel class="w-full">
      <Select v-model="form.timezone" :options="timezoneArr" class="w-full" />
      <label for="dateEnd">Часовой пояс</label>
    </FloatLabel>

    <div class="flex w-full gap-x-4">
      <FloatLabel class="w-1/2">
        <Select
          v-model="form.remindValue"
          :options="remindValue[form?.remindType ?? 'minutes']"
          class="w-full"
        />
        <label for="dateEnd">Напомнить о событии за</label>
      </FloatLabel>

      <FloatLabel class="w-1/2">
        <Select
          v-model="form.remindType"
          :options="remindTypeOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
      </FloatLabel>
    </div>

    <!-- <div class="flex flex-col gap-1">
      <InputText name="username" type="text" placeholder="Username" fluid />
      <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
        $form.username.error?.message
      }}</Message>

      <InputText name="password" type="password" placeholder="Password" fluid />
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
        $form.password.error?.message
      }}</Message>
    </div> -->
    <Button
      type="submit"
      label="Создать событие"
      class="ml-auto"
      :disabled="isLoading || !isValidate"
    />
  </Form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, type Reactive } from 'vue'
import type { TimeItem, UserEvent } from '@/types'
import type { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'

const timezoneArr: Array<string> = Intl.supportedValuesOf('timeZone')

const remindTypeOptions: Array<{
  label: string
  value: TimeItem
}> = [
  {
    label: 'Минуты',
    value: 'minutes',
  },
  {
    label: 'Часы',
    value: 'hours',
  },
  {
    label: 'Дни',
    value: 'days',
  },
]

const remindValue: Record<TimeItem, Array<number>> = {
  minutes: Array.from({ length: 59 }, (_, v) => v + 1),
  hours: Array.from({ length: 23 }, (_, v) => v + 1),
  days: Array.from({ length: 31 }, (_, v) => v + 1),
}

const initialValues: UserEvent = {
  title: '',
  desc: '',
  dateStart: new Date(),
  dateEnd: new Date(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  remindValue: 2,
  remindType: remindTypeOptions[0].value,
  url: undefined,
  address: undefined,
}

const isLoading = ref(false)
const isValidate = ref(false)
const form: Reactive<UserEvent> = reactive(initialValues)

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
</script>

<style scoped></style>
