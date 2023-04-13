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
  width?: string
}>()

defineEmits<{
  (emit: 'update:modelValue', value: string): void
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
  <div :class="width ? `w-[${width}]` : 'w-full'">
    <label v-if="label" class="block text-sm text-grey mb-2" :for="labelConnector">
      {{ label }}
    </label>

    <input
      :value="value"
      v-on="validationListeners"
      :id="labelConnector"
      :class="[
        'w-full h-12 border border-bright-grey rounded px-4 text-base focus:border-blue focus:outline-none',
        hasError ? 'border-red' : 'border-bright-grey'
      ]"
      v-bind="$attrs"
    />

    <span v-if="helperText" :class="['block text-xs mt-1.5', hasError ? 'text-red' : 'text-grey']">
      {{ helperText }}
    </span>
  </div>
</template>
