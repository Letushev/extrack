<script setup lang="ts">
import axios from 'axios'

import BaseButton from '@/components/BaseButton.vue'
axios
  .get('https://extrack-4fc97-default-rtdb.firebaseio.com/exercises.json', {
    params: {
      orderBy: '"userId"',
      equalTo: '"guLQvovWGCgV0uZjMtbS3n6C9dV2"'
    }
  })
  .then((data) => {
    console.log(data)
  })
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-[2rem] font-medium">My Exercises</h1>
    <BaseButton>Add exercise</BaseButton>
  </div>
</template>
