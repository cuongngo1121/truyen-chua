<template>
  <div class="w-full py-8 md:py-12" v-if="comics && comics.length > 0">
    <div class="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl md:text-3xl font-bold text-white">
          {{ title }}
        </h2>
        <router-link 
          v-if="viewAllLink"
          :to="viewAllLink"
          class="text-orange-500 hover:text-orange-400 text-sm font-semibold flex items-center gap-1"
        >
          Xem tất cả
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- Swiper Slider -->
      <swiper
        :modules="modules"
        :slides-per-view="2"
        :space-between="12"
        :breakpoints="{
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 }
        }"
        :navigation="true"
        class="comic-slider"
      >
        <swiper-slide v-for="comic in comics" :key="comic.slug || comic._id">
          <ComicCard :comic="comic" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ComicCard from './ComicCard.vue'
import 'swiper/css'
import 'swiper/css/navigation'

defineProps({
  title: {
    type: String,
    required: true
  },
  comics: {
    type: Array,
    default: () => []
  },
  viewAllLink: {
    type: String,
    default: ''
  }
})

const modules = [Navigation]
</script>

<style scoped>
.comic-slider :deep(.swiper-button-next),
.comic-slider :deep(.swiper-button-prev) {
  color: white;
  background: rgba(255, 107, 53, 0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s;
}

.comic-slider :deep(.swiper-button-next):hover,
.comic-slider :deep(.swiper-button-prev):hover {
  background: rgba(255, 107, 53, 1);
  transform: scale(1.1);
}

.comic-slider :deep(.swiper-button-next):after,
.comic-slider :deep(.swiper-button-prev):after {
  font-size: 16px;
  font-weight: bold;
}

.comic-slider :deep(.swiper-button-disabled) {
  opacity: 0.3;
}
</style>
