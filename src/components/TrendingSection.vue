<template>
  <div class="w-full py-8 md:py-12">
    <div class="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl md:text-3xl font-bold text-white">Nổi Bật Hôm Nay</h2>
      </div>

      <!-- Comics Grid -->
      <div v-if="comics && comics.length > 0" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        <ComicCard v-for="comic in comics.slice(0, gridSize)" :key="comic.slug || comic._id" :comic="comic" />
      </div>
      
      <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        <SkeletonCard v-for="i in gridSize" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ComicCard from './ComicCard.vue'
import SkeletonCard from './SkeletonCard.vue'

defineProps({
  comics: {
    type: Array,
    default: () => []
  },
  gridSize: {
    type: Number,
    default: 12
  }
})
</script>
