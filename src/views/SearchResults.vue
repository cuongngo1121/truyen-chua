<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <NavBar />
    
    <div class="flex-1 pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <div class="py-8">
        <h1 class="text-3xl font-bold mb-6">Kết quả tìm kiếm: "{{ keyword }}"</h1>
        
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <SkeletonCard v-for="i in 12" :key="i" />
        </div>

        <!-- Results -->
        <div v-else-if="results.length > 0">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <ComicCard v-for="comic in results" :key="comic.slug || comic._id" :comic="comic" />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-8">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors"
            >
              ← Trước
            </button>
            
            <div class="flex gap-2">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  'px-4 py-2 rounded-lg border',
                  page === currentPage 
                    ? 'bg-orange-500 border-orange-500 text-white' 
                    : 'bg-white/5 border-white/10 hover:bg-orange-500 transition-colors'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors"
            >
              Sau →
            </button>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-20">
          <svg class="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-2xl font-bold text-gray-400 mb-2">Không tìm thấy kết quả</h2>
          <p class="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
        </div>
      </div>
    </div>

    <FooterWeb />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useComicStore } from '../stores/comicStore'
import NavBar from '../components/NavBar.vue'
import ComicCard from '../components/ComicCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import FooterWeb from '../components/FooterWeb.vue'

const route = useRoute()
const router = useRouter()
const comicStore = useComicStore()
const loading = ref(true)
const results = ref([])
const keyword = ref('')
const currentPage = ref(1)
const totalPages = ref(1)

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const searchComics = async () => {
  loading.value = true
  keyword.value = route.query.keyword || ''
  const page = parseInt(route.query.page) || 1
  currentPage.value = page
  
  if (!keyword.value) {
    results.value = []
    loading.value = false
    return
  }

  try {
    const data = await comicStore.searchComics(keyword.value)
    // Assuming search API returns similar structure
    results.value = data.data?.items || data
    
    // Calculate pagination if API provides it
    if (data.data?.params?.pagination) {
      const pagination = data.data.params.pagination
      if (pagination.totalPages) {
        totalPages.value = pagination.totalPages
      } else if (pagination.totalItems && pagination.totalItemsPerPage) {
        totalPages.value = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)
      }
    } else {
      // Default: assume more pages if we got a full page
      totalPages.value = results.value.length >= 24 ? currentPage.value + 1 : currentPage.value
    }
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    router.push({ query: { keyword: keyword.value, page } })
  }
}

onMounted(() => {
  searchComics()
})

watch(() => [route.query.keyword, route.query.page], () => {
  searchComics()
})
</script>
