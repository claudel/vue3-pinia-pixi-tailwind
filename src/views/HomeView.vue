<script setup lang="ts">
import { onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useGameStore } from '@/stores/game'
import SomeComponent from '@/components/SomeComponent.vue'

const gameStore = useGameStore()

useMeta({
  title: 'Sample',
  description: 'Sample',
  keywords: 'Sample'
})

onMounted(async () => {
  console.log(gameStore.player)
})
</script>

<template>
  <main class="h-full">
    <SomeComponent></SomeComponent>
  </main>
</template>
