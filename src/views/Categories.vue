<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <NavBar />
    
    <div class="flex-1 pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full">
      <div class="py-8">
        <h1 class="text-3xl font-bold mb-6">Tất Cả Thể Loại</h1>
        
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="i in 12" :key="i" class="skeleton h-12 rounded-lg"></div>
        </div>

        <!-- Categories Grid -->
        <div v-else-if="categories.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link
            v-for="category in categories"
            :key="category.id || category.slug"
            :to="`/the-loai/${category.id || category.slug}`"
            class="px-6 py-4 bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 rounded-lg text-center font-semibold transition-all"
          >
            {{ category.name }}
          </router-link>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <p class="text-gray-400">Không có thể loại nào</p>
        </div>
      </div>
    </div>

    <FooterWeb />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useComicStore } from '../stores/comicStore'
import NavBar from '../components/NavBar.vue'
import FooterWeb from '../components/FooterWeb.vue'

const comicStore = useComicStore()
const loading = ref(true)
const categories = ref([])

onMounted(async () => {
  try {
    categories.value = await comicStore.getCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  } finally {
    loading.value = false
  }
})
</script>
