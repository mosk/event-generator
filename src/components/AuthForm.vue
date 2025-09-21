<template>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { FormResolverOptions } from '@primevue/forms'
import type { ToastMessageOptions } from 'primevue'

const toast = useToast()

const isLoading = ref(false)
const initialValues = reactive({
  username: '',
  password: '',
})

const resolver = ({ values }: FormResolverOptions) => {
  const errors = {} as Record<keyof typeof initialValues, Array<Pick<Error, 'message'>>>

  if (!values.username) errors.username = [{ message: 'Username is required.' }]
  if (!values.password) errors.password = [{ message: 'Password is required.' }]

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors,
  }
}

const onFormSubmit = async ({ valid, values }) => {
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
