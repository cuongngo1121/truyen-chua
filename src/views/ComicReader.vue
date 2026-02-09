<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <!-- Top Navigation Bar with Comic Info -->
    <div class="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <router-link :to="`/truyen-tranh/${$route.params.slug}`" class="text-orange-500 hover:text-orange-400">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        
        <div class="flex-1 text-center px-4">
          <h1 class="font-bold truncate">{{ comicTitle }}</h1>
          <p class="text-sm text-gray-400 truncate">{{ chapterTitle }}</p>
        </div>

        <button
          @click="toggleFullscreen"
          class="text-gray-400 hover:text-white"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Comic Pages -->
    <div class="flex-1 pt-16">
      <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="loader mb-4"></div>
          <p>Đang tải chương...</p>
        </div>
      </div>

      <div v-else-if="images.length > 0" class="max-w-4xl mx-auto">
        <!-- Images -->
        <div class="space-y-0">
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            :alt="`Trang ${index + 1}`"
            class="w-full"
            loading="lazy"
            @error="handleImageError"
          />
        </div>

        <!-- Chapter Navigation -->
        <div class="bg-gray-900/95 backdrop-blur-xl p-4 flex items-center justify-between gap-4 sticky bottom-0 border-t border-white/10">
          <button
            @click="goToPrevChapter"
            :disabled="!hasPrevChapter"
            class="btn-secondary w-12 h-12 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'opacity-0 pointer-events-none': !hasPrevChapter }"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <router-link
            :to="`/truyen-tranh/${$route.params.slug}`"
            class="flex-1 btn-secondary py-3 rounded-lg font-bold flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span class="hidden md:inline">Danh sách chương</span>
          </router-link>

          <button
            @click="goToNextChapter"
            :disabled="!hasNextChapter"
            class="btn-primary w-12 h-12 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'opacity-0 pointer-events-none': !hasNextChapter }"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div v-else-if="!loading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <p class="text-gray-400 mb-4">Không tìm thấy nội dung chương</p>
          <router-link
            :to="`/truyen-tranh/${$route.params.slug}`"
            class="btn-primary px-6 py-3 rounded-lg font-bold inline-block"
          >
            Quay lại trang truyện
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComicStore } from '../stores/comicStore'

const route = useRoute()
const router = useRouter()
const comicStore = useComicStore()
const loading = ref(true)
const comicTitle = ref('')
const chapterTitle = ref('')
const images = ref([])
const allChapters = ref([])
const currentChapterIndex = ref(-1)
const hasNextChapter = ref(false)
const hasPrevChapter = ref(false)

const handleImageError = (e) => {
  console.error('Image load error:', e.target.src)
  e.target.style.display = 'none'
}

const loadChapter = async () => {
  loading.value = true
  images.value = []
  
  try {
    // Get comic details first
    const comicData = await comicStore.getComicDetail(route.params.slug)
    const comic = comicData.data?.item || comicData.data
    comicTitle.value = comic.name || comic.title
    
    // Get all chapters from server_data
    let chapterData = []
    if (comic.chapters && comic.chapters.length > 0) {
      chapterData = comic.chapters[0]?.server_data || []
    }
    allChapters.value = chapterData
    
    // Find current chapter by API URL from query
    const chapterApiUrl = route.query.chapter
    
    if (!chapterApiUrl) {
      console.error('No chapter URL provided in query')
      loading.value = false
      return
    }
    
    currentChapterIndex.value = allChapters.value.findIndex(ch => 
      ch.chapter_api_data === chapterApiUrl
    )
    
    if (currentChapterIndex.value !== -1) {
      const currentChapter = allChapters.value[currentChapterIndex.value]
      chapterTitle.value = `Chương ${currentChapter.chapter_name}`
      
      // Set navigation flags
      hasPrevChapter.value = currentChapterIndex.value > 0
      hasNextChapter.value = currentChapterIndex.value < allChapters.value.length - 1
      
      // Fetch chapter images from chapter API
      if (currentChapter.chapter_api_data) {
        const response = await fetch(currentChapter.chapter_api_data)
        const chapterDetail = await response.json()
        
        if (chapterDetail.status === 'success' && chapterDetail.data?.item) {
          const item = chapterDetail.data.item
          const domainCdn = chapterDetail.data.domain_cdn || 'https://sv1.otruyencdn.com'
          const chapterPath = item.chapter_path
          const chapterImages = item.chapter_image || []
          
          // Construct full image URLs
          images.value = chapterImages.map(img => {
            const imageFile = typeof img === 'string' ? img : img.image_file
            return `${domainCdn}/${chapterPath}/${imageFile}`
          })
        }
      }
    } else {
      console.error('Chapter not found:', chapterApiUrl)
    }
  } catch (error) {
    console.error('Error loading chapter:', error)
  } finally {
    loading.value = false
  }
}

const goToPrevChapter = () => {
  if (hasPrevChapter.value) {
    const prevChapter = allChapters.value[currentChapterIndex.value - 1]
    router.push({
      name: 'ComicReader',
      params: { slug: route.params.slug },
      query: { chapter: prevChapter.chapter_api_data }
    })
    window.scrollTo(0, 0)
  }
}

const goToNextChapter = () => {
  if (hasNextChapter.value) {
    const nextChapter = allChapters.value[currentChapterIndex.value + 1]
    router.push({
      name: 'ComicReader',
      params: { slug: route.params.slug },
      query: { chapter: nextChapter.chapter_api_data }
    })
    window.scrollTo(0, 0)
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

onMounted(() => {
  loadChapter()
})

watch(() => route.query.chapter, () => {
  loadChapter()
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
</style>
