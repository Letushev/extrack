<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from './BaseButton.vue'
import type { ExerciseFormOutput } from './exercise-form/exercise-form-schema'
import ExerciseForm from './exercise-form/ExerciseForm.vue'

const formId = 'add-exercise-form'
const showModal = ref(false)

const onSubmit = (values: ExerciseFormOutput) => {
  console.log(values)
}
</script>

<template>
  <BaseButton @click="showModal = true">Add exercise</BaseButton>
  <BaseModal title="Add exercise" :open="showModal" @close="showModal = false" :form-id="formId">
    <ExerciseForm :formId="formId" @submit="onSubmit" />
  </BaseModal>
</template>
