<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <NavBar />
    
    <div class="flex-1 pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <div v-if="loading" class="py-12">
        <div class="skeleton h-96 rounded-xl mb-8"></div>
        <div class="skeleton h-10 w-3/4 mb-4"></div>
        <div class="skeleton h-6 w-full mb-2"></div>
        <div class="skeleton h-6 w-full mb-2"></div>
        <div class="skeleton h-6 w-2/3"></div>
      </div>

      <div v-else-if="comic" class="py-8">
        <!-- Comic Info -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Cover Image -->
          <div class="md:col-span-1">
            <img 
              :src="getImageUrl(comic)"
              :alt="comic.name || comic.title"
              class="w-full rounded-xl shadow-2xl"
              @error="handleImageError"
            />
          </div>

          <!-- Info -->
          <div class="md:col-span-2 space-y-4">
            <h1 class="text-4xl font-black">{{ comic.name || comic.title }}</h1>
            
            <div class="flex flex-wrap gap-2">
              <span v-if="comic.status" class="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded">
                {{ getStatusText(comic.status) }}
              </span>
              <span v-if="comic.author_name || comic.author" class="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">
                Tác giả: {{ comic.author_name || comic.author }}
              </span>
            </div>

            <p v-if="comic.content" class="text-gray-300 leading-relaxed" v-html="comic.content"></p>

            <div v-if="comic.category && comic.category.length > 0" class="flex flex-wrap gap-2">
              <router-link
                v-for="cat in comic.category"
                :key="cat.id || cat.slug"
                :to="`/the-loai/${cat.slug || cat.id}`"
                class="px-3 py-1 bg-white/5 border border-white/10 hover:border-orange-500 hover:bg-orange-500/10 text-sm rounded transition-colors"
              >
                {{ cat.name }}
              </router-link>
            </div>

            <div class="pt-4">
              <button 
                v-if="chapters && chapters.length > 0"
                @click="readFirstChapter"
                class="btn-primary px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                </svg>
                Đọc từ đầu
              </button>
            </div>
          </div>
        </div>

        <!-- Chapters List -->
        <div v-if="chapters && chapters.length > 0" class="bg-gray-900/50 rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Danh Sách Chương</h2>
            <button 
              @click="toggleSort"
              class="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              {{ sortOrder === 'asc' ? 'Cũ nhất' : 'Mới nhất' }}
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <button
              v-for="(chapter, index) in displayedChapters"
              :key="chapter._id || index"
              @click="readChapter(chapter)"
              class="px-4 py-3 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 rounded-lg text-center text-sm font-semibold transition-all truncate"
              :title="chapter.chapter_name"
            >
              {{ chapter.chapter_name.includes('Chương') ? chapter.chapter_name : `Chương ${chapter.chapter_name}` }}
            </button>
          </div>

          <div v-if="chapters.length > 24" class="mt-6 text-center">
            <button 
              @click="isExpanded = !isExpanded"
              class="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-all text-sm inline-flex items-center gap-2"
            >
              <span v-if="!isExpanded">Xem thêm {{ chapters.length - 24 }} chương</span>
              <span v-else>Thu gọn</span>
              <svg 
                class="w-4 h-4 transition-transform duration-300" 
                :class="{ 'rotate-180': isExpanded }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-gray-400">Không tìm thấy truyện</h2>
      </div>
    </div>

    <FooterWeb />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComicStore } from '../stores/comicStore'
import NavBar from '../components/NavBar.vue'
import FooterWeb from '../components/FooterWeb.vue'

const route = useRoute()
const router = useRouter()
const comicStore = useComicStore()
const loading = ref(true)
const comic = ref(null)
const chapters = ref([])
const sortOrder = ref('asc') // 'asc' = Oldest->Newest, 'desc' = Newest->Oldest
const isExpanded = ref(false)

const displayedChapters = computed(() => {
  let sorted = [...chapters.value]
  
  // chapters are typically 1->End by default from API (based on our previous fix)
  // If user wants 'desc' (Mới nhất), we reverse
  if (sortOrder.value === 'desc') {
    sorted.reverse()
  }
  
  if (!isExpanded.value) {
    return sorted.slice(0, 24)
  }
  return sorted
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

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

onMounted(async () => {
  try {
    const data = await comicStore.getComicDetail(route.params.slug)
    comic.value = data.data?.item || data.data
    
    // Get chapters - API structure: chapters[0].server_data
    let chapterData = []
    if (comic.value?.chapters && comic.value.chapters.length > 0) {
      chapterData = comic.value.chapters[0]?.server_data || []
    }
    
    // Keep original order (chapter 1 first)
    chapters.value = chapterData
    
  } catch (error) {
    console.error('Error loading comic:', error)
  } finally {
    loading.value = false
  }
})

const readChapter = (chapter) => {
  router.push({
    name: 'ComicReader',
    params: {
      slug: route.params.slug
    },
    query: {
      chapter: chapter.chapter_api_data || chapter._id
    }
  })
}

const readFirstChapter = () => {
  if (chapters.value.length > 0) {
    readChapter(chapters.value[0])
  }
}
</script>
