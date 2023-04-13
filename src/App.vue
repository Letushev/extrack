<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TextField from './components/TextField.vue'

const value = ref('')
</script>

<template>
  <TextField label="Label" v-model="value" />
  <RouterView />
</template>
