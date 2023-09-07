<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { Graphics } from 'pixi.js'
import { Application } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'

function onDraw(graphics: Graphics) {
  // Rectangle
  graphics.beginFill(0xde3249)
  graphics.drawRect(50, 50, 100, 100)
  graphics.endFill()
}

onMounted(async () => {
  // TODO do stuff on mount
})
</script>

<template>
  <div class="h-full">
    <h1 class="text-grey-900 font-semibold my-2 mx-5 text-xl">Some Component</h1>

    <Application :width="800" :height="600">
      <Graphics @render="onDraw" />
    </Application>
  </div>
</template>

<style scoped>
.leaflet-container {
  background-color: rgb(15 23 42);
}

#inventory {
  position: absolute;
  bottom: -10px;
  height: 100px;
  width: 100%;
  z-index: 1000;
}
</style>
