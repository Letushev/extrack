<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

type Option = { value: string; label?: string; image?: string }

const props = defineProps<{
  modelValue: string
  options: Array<Option>
  label?: string
  error?: boolean
  helperText?: string
  id?: string
  disableClearButton?: boolean
}>()

const emit = defineEmits<{
  (emit: 'update:modelValue', value: string): void
  (emit: 'onClose'): void
}>()

const showOptions = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

const labelConnector = computed(() => props.id || props.label)

const selectedValueLabel = computed(
  () => props.options.find((option) => option.value === props.modelValue)?.label ?? props.modelValue
)

watch(showOptions, (show) => {
  if (!show) {
    emit('onClose')
  }
})

onClickOutside(containerRef, () => {
  showOptions.value = false
})

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
}

const clearValue = () => {
  emit('update:modelValue', '')
  showOptions.value = false
}
</script>

<template>
  <div class="w-full" ref="containerRef">
    <label v-if="label" class="mb-2 block text-sm text-grey" :for="labelConnector">
      {{ label }}
    </label>

    <div class="relative" @click="showOptions = !showOptions">
      <input
        readonly
        type="text"
        autocomplete="off"
        :id="labelConnector"
        :value="selectedValueLabel"
        :class="[
          'h-12 w-full cursor-pointer rounded border border-bright-grey pl-4 pr-14 text-base focus:border-blue focus:outline-none',
          error ? 'border-red' : 'border-bright-grey'
        ]"
      />

      <button
        v-if="!modelValue || disableClearButton"
        type="button"
        class="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-down"
          size="xs"
          class="text-grey transition-transform"
          :class="{
            'rotate-180': showOptions
          }"
        />
      </button>

      <button
        v-if="modelValue && !disableClearButton"
        type="button"
        class="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2"
        @click.stop="clearValue"
      >
        <FontAwesomeIcon icon="fa-solid fa-xmark" size="sm" class="text-grey" />
      </button>

      <Transition name="options">
        <div
          v-if="showOptions"
          class="absolute left-0 top-full z-10 mt-1 w-full origin-top overflow-auto rounded border border-blue bg-white"
        >
          <ul>
            <li
              v-for="option of options"
              :key="option.value"
              @click="selectOption(option)"
              class="flex h-11 cursor-pointer items-center border-b border-b-bright-grey px-4 text-base last-of-type:border-none hover:bg-bubbles"
              :class="{ 'bg-bubbles': option.value === modelValue }"
            >
              <img v-if="option.image" :src="option.image" alt="" width="20" class="mr-2" />
              <span>{{ option.label ?? option.value }} </span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <span v-if="helperText" :class="['mt-1.5 block text-xs', error ? 'text-red' : 'text-grey']">
      {{ helperText }}
    </span>
  </div>
</template>

<style scoped>
.options-enter-active,
.options-leave-active {
  @apply transition-transform duration-75;
}

.options-enter-from,
.options-leave-to {
  @apply scale-y-50;
}
</style>
