<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent border-b border-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center h-16 gap-6">
        <!-- LOGO -->
        <router-link to="/" class="group shrink-0">
          <div class="flex flex-col">
            <span class="text-2xl font-black gradient-text tracking-tighter hover:opacity-80 transition-opacity duration-300">
              TRUYỆN CHÙA
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in mainMenuItems"
            :key="item.link"
            :to="item.link"
            class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            active-class="text-white bg-white/10"
          >
            {{ item.name }}
          </router-link>

          <!-- Categories Dropdown -->
          <div class="flex items-center gap-1 ml-1">
            <div class="w-px h-4 bg-white/10 mx-2"></div>
            
            <div class="relative group">
              <router-link 
                to="/the-loai"
                class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <span>Thể Loại</span>
                <svg class="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Spacer -->
        <div class="flex-1"></div>

        <!-- Right Side: Search -->
        <div class="hidden lg:flex items-center gap-4">
          <div class="w-64 transition-all duration-300 focus-within:w-80">
             <SearchBox placeholder="Tìm kiếm truyện..." />
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden ml-auto p-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="isMobileMenuOpen" class="lg:hidden bg-[#0f0f0f] border-t border-white/5 h-[calc(100vh-64px)] overflow-y-auto">
        <div class="px-4 py-6 space-y-4">
          <!-- Search Mobile -->
          <div class="relative pb-2">
             <SearchBox placeholder="Tìm kiếm truyện..." class="w-full" />
          </div>

          <!-- Main Menu Grid -->
          <div class="grid grid-cols-2 gap- 2">
            <router-link
              v-for="item in mainMenuItems"
              :key="item.link"
              :to="item.link"
              @click="closeMobileMenu"
              class="flex items-center justify-center h-12 rounded-xl text-sm font-bold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-95"
              active-class="text-orange-500 bg-orange-500/10 border-orange-500/20"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchBox from './SearchBox.vue'

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const mainMenuItems = [
  { name: 'Trang chủ', link: '/' },
  { name: 'Truyện Mới', link: '/danh-sach/truyen-moi' },
  { name: 'Đang Phát Hành', link: '/danh-sach/dang-phat-hanh' },
  { name: 'Hoàn Thành', link: '/danh-sach/hoan-thanh' },
  { name: 'Sắp Ra Mắt', link: '/danh-sach/sap-ra-mat' }
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) document.body.style.overflow = 'hidden'
  else document.body.style.overflow = ''
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('toggle-mobile-menu', toggleMobileMenu)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('toggle-mobile-menu', toggleMobileMenu)
  document.body.style.overflow = ''
})
</script>
