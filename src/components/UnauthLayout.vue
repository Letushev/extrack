<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="h-screen flex">
    <div class="flex items-center justify-center bg-white h-full w-[40%] min-w-[364px]">
      <section class="w-[300px]">
        <div class="flex items-center justify-center mb-10">
          <img src="@/assets/images/logo-dumbbell.png" alt="dumbbell" width="56" />
          <h1 class="font-['Audiowide'] text-5xl text-blue ml-5">ExTrack</h1>
        </div>
        <h2 class="font-bold text-[2rem] text-center mb-14">{{ title }}</h2>
        <slot></slot>
      </section>
    </div>
    <div
      class="h-full bg-ghost-white w-[60%] bg-unauth bg-no-repeat bg-center bg-[length:70%]"
    ></div>
  </div>
</template>
