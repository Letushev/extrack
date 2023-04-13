<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  helperText?: string
  id?: string
  error?: boolean
  width?: string
}>()

defineEmits<{
  (emit: 'update:modelValue', value: string): void
}>()

const labelConnector = computed(() => props.id || props.label)
</script>

<template>
  <div :class="width ? `w-[${width}]` : 'w-full'">
    <label v-if="label" class="block text-sm text-grey mb-2" :for="labelConnector">{{
      label
    }}</label>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :id="labelConnector"
      :class="[
        'w-full h-12 border border-bright-grey rounded px-4 text-base focus:border-blue focus:outline-none',
        error ? 'border-red' : 'border-bright-grey'
      ]"
      v-bind="$attrs"
    />

    <span v-if="helperText" :class="['block text-xs mt-1.5', error ? 'text-red' : 'text-grey']">{{
      helperText
    }}</span>
  </div>
</template>
