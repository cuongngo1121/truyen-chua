<template>
  <div class="bg-black min-h-screen text-white" :class="{ 'pb-16 lg:pb-0': !$route.meta.hideBottomNav }">
    <WelcomeScreen v-if="showWelcome" @finish="handleWelcomeFinish" />
    <div v-else>
      <LoadingOverlay :is-loading="isLoading" />
      <router-view :key="$route.fullPath" />
      <BottomNav v-if="!$route.meta.hideBottomNav" @open-menu="handleOpenMenu" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useComicStore } from './stores/comicStore'
import { useRouter } from 'vue-router'
import BottomNav from './components/BottomNav.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'
import WelcomeScreen from './components/WelcomeScreen.vue'

const isLoading = ref(false)
const showWelcome = ref(true)
const router = useRouter()
const comicStore = useComicStore()

router.beforeEach((to, from, next) => {
  // Only show loading overlay if welcome screen is finished
  if (!showWelcome.value) {
    isLoading.value = true
  }
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800) // Minimum loading time for smooth transition
})

onMounted(() => {
  prefetchHomeData()
})

async function prefetchHomeData() {
  try {
    // Prefetch home page data
    await comicStore.getHomeData()
  } catch (e) {
    console.error('Prefetch failed', e)
  }
}

const handleWelcomeFinish = () => {
  showWelcome.value = false
}

const handleOpenMenu = () => {
  // Dispatch event for mobile menu
  window.dispatchEvent(new CustomEvent('toggle-mobile-menu'))
}
</script>

<style>
/* Global styles */
body {
  background-color: black;
  color: white;
}
</style>
