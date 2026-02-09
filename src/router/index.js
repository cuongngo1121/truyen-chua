import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/truyen-tranh/:slug",
        name: "ComicDetail",
        component: () => import("../views/ComicDetail.vue"),
    },
    {
        path: "/the-loai",
        name: "Categories",
        component: () => import("../views/Categories.vue"),
    },
    {
        path: "/the-loai/:slug",
        name: "CategoryView",
        component: () => import("../views/CategoryView.vue"),
    },
    {
        path: "/danh-sach/:type",
        name: "StatusView",
        component: () => import("../views/StatusView.vue"),
    },
    {
        path: "/doc-truyen/:slug",
        name: "ComicReader",
        component: () => import("../views/ComicReader.vue"),
        meta: { hideBottomNav: true }
    },
    {
        path: "/tim-kiem",
        name: "SearchResults",
        component: () => import("../views/SearchResults.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
        meta: { title: "404 - Không tìm thấy trang" }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
});

router.beforeEach((to, from, next) => {
    // Default title
    let title = "Truyện Chùa - Đọc Truyện Tranh Online"

    // Check if route has meta title
    if (to.meta && to.meta.title) {
        title = `${to.meta.title} | Truyện Chùa`
    }

    // Determine dynamic title based on logic
    if (to.name === 'Home') title = "Truyện Chùa - Trang Chủ"
    if (to.name === 'Categories') title = "Thể Loại - Truyện Chùa"
    if (to.name === 'SearchResults') title = "Tìm Kiếm - Truyện Chùa"

    document.title = title
    next()
})

export default router;
