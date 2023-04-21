<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'contained' | 'outlined'
type ButtonSize = 'small' | 'medium' | 'large'
type ButtonColor = 'primary' | 'error' | 'text'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  isLoading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  isLoading: false
})

const sizeStyles: Record<ButtonSize, string> = {
  small: 'h-9 px-4 text-sm',
  medium: 'h-12 px-6 text-base',
  large: 'h-14 px-8 text-lg'
}

const variantStyles: Record<ButtonVariant, string> = {
  contained: 'text-white',
  outlined: 'border bg-none'
}

const variantColorStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  contained: {
    primary: 'bg-blue hover:bg-honolulu-blue',
    error: 'bg-red hover:bg-mahogany',
    text: 'bg-grey hover:bg-metal'
  },
  outlined: {
    primary: 'border-blue text-blue hover:bg-bubbles',
    error: 'border-red text-red hover:bg-linen',
    text: 'border-light-silver text-grey hover:bg-flash-white'
  }
}

const disabled = computed(() => props.isLoading || props.disabled)

const buttonClass = computed(() => {
  return [
    'rounded font-medium transition-colors',
    sizeStyles[props.size],
    variantStyles[props.variant],
    variantColorStyles[props.variant][props.color],
    {
      'bg-light-silver hover:bg-light-silver': disabled.value
    }
  ]
})
</script>

<template>
  <button :class="buttonClass" :disabled="disabled">
    <slot v-if="!isLoading"></slot>
    <template v-else>Loading...</template>
  </button>
</template>
