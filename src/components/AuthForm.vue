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
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { FormResolverOptions } from '@primevue/forms'

const toast = useToast()

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

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (!valid) return

  toast.add({
    severity: 'success',
    summary: 'Form is submitted.',
    life: 3000,
  })
}
</script>

<style scoped></style>
