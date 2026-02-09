<template>
  <transition name="welcome">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div class="text-center px-6">
        <div class="mb-8">
          <h1 class="text-6xl md:text-8xl font-bold mb-4">
            <span class="gradient-text">Truyện Chùa</span>
          </h1>
          <p class="text-gray-400 text-xl md:text-2xl">Đọc truyện tranh miễn phí</p>
        </div>
        
        <div class="flex flex-col items-center space-y-4">
          <div class="loader-circle"></div>
          <p class="text-gray-500 text-sm">Đang khởi động...</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(true)
const emit = defineEmits(['finish'])

onMounted(() => {
  setTimeout(() => {
    show.value = false
    setTimeout(() => {
      emit('finish')
    }, 500)
  }, 2000)
})
</script>

<style scoped>
.loader-circle {
  border: 3px solid rgba(255, 107, 53, 0.1);
  border-radius: 50%;
  border-top: 3px solid var(--color-brand);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.welcome-enter-active, .welcome-leave-active {
  transition: opacity 0.5s;
}

.welcome-enter-from, .welcome-leave-to {
  opacity: 0;
}
</style>
