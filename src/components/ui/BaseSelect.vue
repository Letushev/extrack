<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useField } from 'vee-validate'
import { computed, ref, watch } from 'vue'

type Option = { value: string; label?: string; image?: string }

const props = defineProps<{
  name: string
  options: Array<Option>
  label?: string
  helperText?: string
  id?: string
}>()

const showOptions = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)

const { value, errorMessage, handleChange, validate } = useField<string>(() => props.name)

const labelConnector = computed(() => props.id || props.label)
const hasError = computed(() => Boolean(errorMessage.value))
const helperText = computed(() => errorMessage.value || props.helperText)

const selectedValueLabel = computed(
  () => props.options.find((option) => option.value === value.value)?.label ?? value.value
)

watch(showOptions, (show) => {
  if (!show) {
    validate()
  }
})

onClickOutside(containerRef, () => {
  showOptions.value = false
})

const selectOption = (option: Option) => {
  handleChange(option.value)
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
          hasError ? 'border-red' : 'border-bright-grey'
        ]"
      />

      <button type="button" class="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2">
        <FontAwesomeIcon
          icon="fa-solid fa-chevron-down"
          size="xs"
          class="text-grey transition-transform"
          :class="{
            'rotate-180': showOptions
          }"
        />
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
              :class="{ 'bg-bubbles': option.value === value }"
            >
              <img v-if="option.image" :src="option.image" alt="" width="20" class="mr-2" />
              <span>{{ option.label ?? option.value }} </span>
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <span v-if="helperText" :class="['mt-1.5 block text-xs', hasError ? 'text-red' : 'text-grey']">
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
