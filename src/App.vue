<script setup lang="ts">
import { RouterView } from 'vue-router'

import ToastContainer from '@/components/ui/ToastContainer.vue'

import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
authStore.tryAutoAuthorize()
</script>

<template>
  <RouterView />
  <ToastContainer />
</template>
