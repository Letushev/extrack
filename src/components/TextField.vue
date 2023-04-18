<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label?: string
  helperText?: string
  id?: string
  multiline?: boolean
}>()

const { value, errorMessage, handleChange } = useField<string>(() => props.name, undefined, {
  validateOnValueUpdate: false
})

const labelConnector = computed(() => props.id || props.label)
const hasError = computed(() => Boolean(errorMessage.value))
const helperText = computed(() => errorMessage.value || props.helperText)

const validationListeners = computed(() => {
  return {
    blur: handleChange,
    change: handleChange,
    input: (event: InputEvent) => handleChange(event, hasError.value)
  }
})
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-2 block text-sm text-grey" :for="labelConnector">
      {{ label }}
    </label>

    <component
      :is="multiline ? 'textarea' : 'input'"
      :value="value"
      v-on="validationListeners"
      :id="labelConnector"
      :class="[
        'h-12 w-full rounded border border-bright-grey px-4 text-base focus:border-blue focus:outline-none',
        hasError ? 'border-red' : 'border-bright-grey',
        { 'h-24 resize-none py-3.5': multiline }
      ]"
      v-bind="$attrs"
    />

    <span v-if="helperText" :class="['mt-1.5 block text-xs', hasError ? 'text-red' : 'text-grey']">
      {{ helperText }}
    </span>
  </div>
</template>
