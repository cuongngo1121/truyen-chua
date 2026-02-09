import { defineStore } from 'pinia'
import axiosClient from '../api/axiosClient'

export const useComicStore = defineStore('comic', {
    state: () => ({
        homeData: null,
        categories: [],
        comicsByStatus: {},
        comicsByCategory: {},
        comicDetails: {},
        searchResults: [],
        loading: false,
        error: null
    }),

    actions: {
        async getHomeData() {
            if (this.homeData) return this.homeData

            try {
                this.loading = true
                const response = await axiosClient.get('/home')
                this.homeData = response.data
                return response.data
            } catch (error) {
                this.error = error.message
                console.error('Error fetching home data:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async getComicsByStatus(type = 'truyen-moi', page = 1) {
            const cacheKey = `${type}_${page}`
            if (this.comicsByStatus[cacheKey]) {
                return this.comicsByStatus[cacheKey]
            }

            try {
                this.loading = true
                const response = await axiosClient.get(`/danh-sach/${type}`, {
                    params: { page }
                })
                this.comicsByStatus[cacheKey] = response.data
                return response.data
            } catch (error) {
                this.error = error.message
                console.error(`Error fetching comics by status ${type}:`, error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async getCategories() {
            if (this.categories.length > 0) return this.categories

            try {
                this.loading = true
                const response = await axiosClient.get('/the-loai')
                this.categories = response.data.data?.items || []
                return this.categories
            } catch (error) {
                this.error = error.message
                console.error('Error fetching categories:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async getComicsByCategory(slug, page = 1) {
            const cacheKey = `${slug}_${page}`
            if (this.comicsByCategory[cacheKey]) {
                return this.comicsByCategory[cacheKey]
            }

            try {
                this.loading = true
                const response = await axiosClient.get(`/the-loai/${slug}`, {
                    params: { page }
                })
                this.comicsByCategory[cacheKey] = response.data
                return response.data
            } catch (error) {
                this.error = error.message
                console.error(`Error fetching comics by category ${slug}:`, error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async getComicDetail(slug) {
            if (this.comicDetails[slug]) {
                return this.comicDetails[slug]
            }

            try {
                this.loading = true
                const response = await axiosClient.get(`/truyen-tranh/${slug}`)
                this.comicDetails[slug] = response.data
                return response.data
            } catch (error) {
                this.error = error.message
                console.error(`Error fetching comic detail ${slug}:`, error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async searchComics(keyword) {
            try {
                this.loading = true
                const response = await axiosClient.get('/tim-kiem', {
                    params: { keyword }
                })
                this.searchResults = response.data.data?.items || []
                return this.searchResults
            } catch (error) {
                this.error = error.message
                console.error('Error searching comics:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        clearSearch() {
            this.searchResults = []
        }
    }
})
