<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

import BaseButton from './BaseButton.vue'
import NavigationLink from './NavigationLink.vue'
const { logout } = useAuthStore()
</script>

<template>
  <div>
    <header
      class="fixed top-0 left-0 right-0 h-20 bg-white flex items-center justify-center px-6 border-b border-bright-grey"
    >
      <nav class="flex space-x-12 h-full">
        <NavigationLink :to="{ name: 'tracking' }">Tracking</NavigationLink>
        <NavigationLink :to="{ name: 'exercises' }">Exercises</NavigationLink>
      </nav>
      <BaseButton
        variant="outlined"
        color="text"
        size="small"
        class="absolute right-6"
        @click="logout"
        >Log out</BaseButton
      >
    </header>
    <main class="mt-20 h-[calc(100vh-theme(spacing.20))] overflow-auto bg-ghost-white p-12">
      <div class="max-w-[1184px] mx-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
