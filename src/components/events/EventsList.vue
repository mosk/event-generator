<template>
  <DataTable
    :value="createdEvents"
    scrollable
    scrollHeight="flex"
    :virtualScrollerOptions="{ itemSize: 44 }"
  >
    <Column field="title" header="Заголовок"></Column>
    <Column field="dateStart" header="Начало">
      <template #body="slotProps">
        {{ new Date(slotProps.data.dateStart).toLocaleString('RU-ru') }}
      </template>
    </Column>
    <Column header="Кнопки">
      <template #body="{ data, index }">
        <div class="flex gap-1">
          <Button
            icon="pi pi-eye"
            aria-label="Посмотреть подробную информацию о событии"
            @click="showEvent(data)"
          />

          <Button icon="pi pi-trash" aria-label="Удалить событие" @click="removeEvent(data)" />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog v-if="selectedEvent" v-model:visible="isVisibleDialog" modal header="Header" closable>
    <dl>
      <template v-for="[key, value] in Object.entries(selectedEvent)">
        <dt>{{ key }}</dt>
        <dd>{{ value }}</dd>
      </template>
    </dl>
  </Dialog>
</template>

<script setup lang="ts">
import type { UserEvent } from '@/types'
import { ref } from 'vue'
import { events } from '@/mock'

const createdEvents = ref<Array<UserEvent>>(events)
const selectedEvent = ref<UserEvent | undefined>()
const isVisibleDialog = ref(false)

const showEvent = (eventDetails: UserEvent) => {
  selectedEvent.value = eventDetails
  isVisibleDialog.value = true
}

const removeEvent = (eventDetails: UserEvent) => {
  console.log(eventDetails)
}
</script>

<style scoped></style>
