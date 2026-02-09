<template>
  <transition name="fade">
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div class="text-center">
        <div class="loader mb-4"></div>
        <p class="text-white text-lg font-semibold">Đang tải...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--color-brand);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
