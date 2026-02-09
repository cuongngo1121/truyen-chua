<template>
  <div class="w-full bg-gradient-to-b from-gray-900 to-black py-8">
    <div class="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">Truyện Nổi Bật</h2>
      
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :pagination="{ clickable: true }"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }"
        class="featured-swiper"
      >
        <swiper-slide v-for="(comic, index) in comics" :key="index">
          <router-link :to="`/truyen-tranh/${comic.slug}`" class="block group">
            <div class="relative rounded-xl overflow-hidden bg-gray-800 h-[400px] md:h-[450px]">
              <!-- Comic Cover Image -->
              <div class="absolute inset-0 flex items-center justify-center p-4">
                <img 
                  :src="getImageUrl(comic)"
                  :alt="comic.name || comic.title"
                  class="max-h-full max-w-full object-contain shadow-2xl rounded-lg transition-transform duration-300 group-hover:scale-105"
                  @error="handleImageError"
                />
              </div>
              
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl md:text-2xl font-bold mb-2 line-clamp-2">
                  {{ comic.name || comic.title }}
                </h3>
                <div class="flex items-center gap-3 text-sm">
                  <span v-if="comic.status" class="px-3 py-1 bg-orange-500 text-white font-bold rounded-full">
                    {{ getStatusText(comic.status) }}
                  </span>
                  <span v-if="comic.chaptersLatest && comic.chaptersLatest.length > 0" class="text-gray-300">
                    Chương {{ comic.chaptersLatest[0].chapter_name }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps({
  comics: {
    type: Array,
    required: true,
    default: () => []
  }
})

const modules = [Navigation, Pagination, Autoplay]

const getImageUrl = (comic) => {
  if (comic.thumb_url) {
    if (comic.thumb_url.startsWith('http')) {
      return comic.thumb_url
    }
    return `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`
  }
  return comic.image || '/placeholder-comic.jpg'
}

const handleImageError = (e) => {
  e.target.src = '/placeholder-comic.jpg'
}

const getStatusText = (status) => {
  const statusMap = {
    'completed': 'Hoàn thành',
    'ongoing': 'Đang tiến hành',
    'coming_soon': 'Sắp ra mắt'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.featured-swiper {
  padding-bottom: 50px;
}

.featured-swiper :deep(.swiper-button-next),
.featured-swiper :deep(.swiper-button-prev) {
  color: var(--color-brand);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.featured-swiper :deep(.swiper-button-next):hover,
.featured-swiper :deep(.swiper-button-prev):hover {
  background: rgba(255, 107, 53, 0.2);
  transform: scale(1.1);
}

.featured-swiper :deep(.swiper-button-next)::after,
.featured-swiper :deep(.swiper-button-prev)::after {
  font-size: 18px;
}

.featured-swiper :deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.5;
  width: 10px;
  height: 10px;
}

.featured-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--color-brand);
  opacity: 1;
  width: 30px;
  border-radius: 5px;
}
</style>

