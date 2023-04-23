<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

import BaseSelect from '@/components/ui/BaseSelect.vue'

type Option = { value: string; label?: string; image?: string }

const props = defineProps<{
  name: string
  options: Array<Option>
  label?: string
  helperText?: string
  id?: string
}>()

const { value, errorMessage, handleChange, validate } = useField<string>(() => props.name)

const hasError = computed(() => Boolean(errorMessage.value))
const helperText = computed(() => errorMessage.value || props.helperText)
</script>

<template>
  <BaseSelect
    :id="id"
    :label="label"
    :options="options"
    :modelValue="value"
    :error="hasError"
    :helperText="helperText"
    @update:modelValue="handleChange"
    @onClose="validate"
  />
</template>
