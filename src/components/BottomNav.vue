<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 pb-safe lg:hidden">
    <div class="flex items-center justify-around h-16">
      <router-link 
        to="/" 
        class="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-white transition-colors"
        active-class="text-orange-500"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-[10px] font-medium">Trang chủ</span>
      </router-link>

      <router-link 
        to="/tim-kiem" 
        class="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-white transition-colors"
        active-class="text-orange-500"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span class="text-[10px] font-medium">Tìm kiếm</span>
      </router-link>

      <router-link 
        to="/the-loai" 
        class="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-white transition-colors"
        active-class="text-orange-500"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span class="text-[10px] font-medium">Thể loại</span>
      </router-link>

      <button 
        @click="$emit('open-menu')"
        class="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-400 hover:text-white transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span class="text-[10px] font-medium">Menu</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['open-menu'])
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
