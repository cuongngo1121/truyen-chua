<template>
  <div class="flex flex-col min-h-screen bg-black text-white justify-center items-center px-6">
    <div class="text-center max-w-md">
      <div class="mb-8">
        <h1 class="text-9xl font-black gradient-text mb-4">404</h1>
        <h2 class="text-3xl font-bold text-white mb-4">Trang không tồn tại</h2>
        <p class="text-gray-400 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>

      <router-link 
        to="/"
        class="btn-primary px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Về trang chủ
      </router-link>
    </div>
  </div>
</template>

<script setup>
// 404 Not Found page
</script>
