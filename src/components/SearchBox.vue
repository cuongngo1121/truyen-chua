<template>
  <div class="relative w-full">
    <input
      v-model="searchQuery"
      @keyup.enter="handleSearch"
      type="text"
      :placeholder="placeholder"
      class="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
    />
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Tìm kiếm...'
  }
})

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchResults', query: { keyword: searchQuery.value } })
  }
}
</script>
