<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <NavBar />
    
    <div class="flex-1 pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <div class="py-8">
        <h1 class="text-3xl font-bold mb-6">{{ statusTitle }}</h1>
        
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <SkeletonCard v-for="i in 18" :key="i" />
        </div>

        <!-- Comics Grid -->
        <div v-else-if="comics.length > 0">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <ComicCard v-for="comic in comics" :key="comic.slug || comic._id" :comic="comic" />
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

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <p class="text-gray-400">Không có truyện nào</p>
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
const comics = ref([])
const currentPage = ref(1)
const totalPages = ref(1)

const statusTitles = {
  'truyen-moi': 'Truyện Mới',
  'sap-ra-mat': 'Sắp Ra Mắt',
  'dang-phat-hanh': 'Đang Phát Hành',
  'hoan-thanh': 'Hoàn Thành'
}

const statusTitle = computed(() => {
  return statusTitles[route.params.type] || 'Danh Sách Truyện'
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const loadComics = async () => {
  loading.value = true
  try {
    const page = parseInt(route.query.page) || 1
    currentPage.value = page
    
    const data = await comicStore.getComicsByStatus(route.params.type, page)
    comics.value = data.data?.items || []
    
    // Calculate total pages from API response
    const params = data.data?.params
    if (params) {
      // Try different possible API structures
      if (params.pagination?.totalPages) {
        totalPages.value = params.pagination.totalPages
      } else if (params.pagination?.totalItems && params.pagination?.totalItemsPerPage) {
        totalPages.value = Math.ceil(params.pagination.totalItems / params.pagination.totalItemsPerPage)
      } else if (data.data?.params?.pagination?.total_page) {
        totalPages.value = data.data.params.pagination.total_page
      } else {
        // If we have items, assume there are more pages
        totalPages.value = comics.value.length >= 24 ? currentPage.value + 1 : currentPage.value
      }
    } else {
      // Default: if we got full page of items, assume there might be more
      totalPages.value = comics.value.length >= 24 ? currentPage.value + 1 : currentPage.value
    }
  } catch (error) {
    console.error('Error loading comics by status:', error)
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    router.push({ query: { page } })
  }
}

onMounted(() => {
  loadComics()
})

watch(() => [route.params.type, route.query.page], () => {
  loadComics()
})
</script>
