<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useGameStore } from '@/stores/game'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'

let gameState = reactive({
  isReady: false
})

const gameStore = useGameStore()
const router = useRouter()
const route = useRoute()

useMeta({
  title: 'Sample',
  htmlAttrs: { lang: 'en', amp: true }
})

const navigation = [{ name: 'Play', to: '/', current: false }]

// watch to see if the player id changes
watch(
  () => gameStore.player.gid,
  () => {
    console.log(gameStore.player)
  }
)

onMounted(async () => {
  await gameStore.loadPlayer('hello world')

  gameState.isReady = true
})
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content}` : `Sample` }}</template>
    <template v-slot:description="{ content }">{{ content ? `${content}` : `Sample` }}</template>
    <template v-slot:keywords="{ content }">{{ content ? `${content}` : `Sample` }}</template>
  </metainfo>
  <Disclosure as="nav" class="bg-slate-800 w-full" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="font-bold text-white text-2xl">Title</h1>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <RouterLink
                v-for="item in navigation"
                :key="item.name"
                :to="{ path: item.to }"
                class="text-gray-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                active-class="bg-slate-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</RouterLink
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block"></div>
        <div class="mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.to"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
  <main class="flex-1 h-full" v-if="gameState.isReady">
    <RouterView />
  </main>
</template>

<style scoped></style>
