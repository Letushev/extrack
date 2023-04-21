<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'

import NavigationLink from './NavigationLink.vue'
const { logout } = useAuthStore()
</script>

<template>
  <div>
    <header
      class="fixed left-0 right-0 top-0 flex h-20 items-center justify-center border-b border-bright-grey bg-white px-6"
    >
      <nav class="flex h-full space-x-12">
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
      <div class="mx-auto max-w-[1184px]">
        <RouterView />
      </div>
    </main>
  </div>
</template>
