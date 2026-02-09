<template>
  <router-link 
    :to="`/truyen-tranh/${comic.slug}`" 
    class="comic-card rounded-lg block overflow-hidden group"
  >
    <div class="relative overflow-hidden aspect-[2/3]">
      <img 
        :src="getImageUrl(comic)"
        :alt="comic.name || comic.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
        @error="handleImageError"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Status badge if available -->
      <div v-if="comic.status" class="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
        {{ getStatusText(comic.status) }}
      </div>
    </div>
    
    <div class="p-3">
      <h3 class="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
        {{ comic.name || comic.title }}
      </h3>
      <p v-if="latestChapter" class="text-gray-400 text-xs line-clamp-1">
        {{ latestChapter }}
      </p>
      <div v-if="comic.updatedAt" class="text-gray-500 text-xs mt-1">
        {{ formatDate(comic.updatedAt) }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  comic: {
    type: Object,
    required: true
  }
})

// Get image URL from OTruyen CDN
const getImageUrl = (comic) => {
  if (comic.thumb_url) {
    // If thumb_url is already a full URL, use it
    if (comic.thumb_url.startsWith('http')) {
      return comic.thumb_url
    }
    // Otherwise prepend CDN domain
    return `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`
  }
  return comic.image || '/placeholder-comic.jpg'
}

const handleImageError = (e) => {
  e.target.src = '/placeholder-comic.jpg'
}

const latestChapter = computed(() => {
  if (props.comic.chaptersLatest && props.comic.chaptersLatest.length > 0) {
    return `Chapter ${props.comic.chaptersLatest[0].chapter_name}`
  }
  return props.comic.lastest_chapter || props.comic.chapter_name || ''
})

const getStatusText = (status) => {
  const statusMap = {
    'completed': 'Hoàn thành',
    'ongoing': 'Đang tiến hành',
    'coming_soon': 'Sắp ra mắt'
  }
  return statusMap[status] || status
}

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return 'Hôm qua'
  if (diffDays < 7) return `${diffDays} ngày trước`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
  return `${Math.floor(diffDays / 30)} tháng trước`
}
</script>
