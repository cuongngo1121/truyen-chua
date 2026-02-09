<template>
  <div class="flex flex-col justify-start bg-black w-full min-h-screen">
    <!-- NavBar -->
    <NavBar />

    <!-- Banner -->
    <div class="mt-16">
      <Banner v-if="featuredComics.length > 0" :comics="featuredComics" />
    </div>

    <!-- Trending Comics Grid -->
    <TrendingSection 
      v-reveal 
      :comics="trendingComics"
      :grid-size="18"
    />

    <!-- Comic Sliders -->
    <div class="w-full space-y-8 md:space-y-12 bg-gradient-to-b from-gray-900 to-black">
      <ComicSlider 
        v-reveal
        v-if="newComics.length > 0"
        title="Truyện Mới Cập Nhật" 
        :comics="newComics"
        view-all-link="/danh-sach/truyen-moi"
      />
      
      <ComicSlider 
        v-reveal
        v-if="ongoingComics.length > 0"
        title="Đang Phát Hành" 
        :comics="ongoingComics"
        view-all-link="/danh-sach/dang-phat-hanh"
      />
      
      <ComicSlider 
        v-reveal
        v-if="completedComics.length > 0"
        title="Hoàn Thành" 
        :comics="completedComics"
        view-all-link="/danh-sach/hoan-thanh"
      />
    </div>

    <FooterWeb />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useComicStore } from '../stores/comicStore'
import NavBar from '../components/NavBar.vue'
import Banner from '../components/Banner.vue'
import ComicSlider from '../components/ComicSlider.vue'
import TrendingSection from '../components/TrendingSection.vue'
import FooterWeb from '../components/FooterWeb.vue'

const comicStore = useComicStore()
const loading = ref(true)
const featuredComics = ref([])
const trendingComics = ref([])
const newComics = ref([])
const ongoingComics = ref([])
const completedComics = ref([])

onMounted(async () => {
  try {
    const homeData = await comicStore.getHomeData()
    
    // Extract data from API response
    if (homeData?.data) {
      const items = homeData.data.items || []
      featuredComics.value = items.slice(0, 5)
      trendingComics.value = items.slice(0, 24)
    }

    // Fetch different categories
    const [newData, ongoingData, completedData] = await Promise.allSettled([
      comicStore.getComicsByStatus('truyen-moi'),
      comicStore.getComicsByStatus('dang-phat-hanh'),
      comicStore.getComicsByStatus('hoan-thanh')
    ])

    if (newData.status === 'fulfilled') {
      newComics.value = newData.value?.data?.items || []
    }
    
    if (ongoingData.status === 'fulfilled') {
      ongoingComics.value = ongoingData.value?.data?.items || []
    }
    
    if (completedData.status === 'fulfilled') {
      completedComics.value = completedData.value?.data?.items || []
    }

  } catch (error) {
    console.error('Error loading home data:', error)
  } finally {
    loading.value = false
  }
})
</script>
