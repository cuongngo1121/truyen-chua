<template>
  <footer class="bg-gradient-to-b from-black to-gray-900 text-gray-400 py-12 border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- About -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4 gradient-text">Truyện Chùa</h3>
          <p class="text-sm leading-relaxed">
            Đọc truyện tranh online miễn phí, cập nhật liên tục các bộ truyện mới nhất. 
            Kho truyện đa dạng với nhiều thể loại hấp dẫn.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">Liên Kết</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/" class="hover:text-orange-500 transition-colors">Trang chủ</router-link></li>
            <li><router-link to="/the-loai" class="hover:text-orange-500 transition-colors">Thể loại</router-link></li>
            <li><router-link to="/danh-sach/truyen-moi" class="hover:text-orange-500 transition-colors">Truyện mới</router-link></li>
            <li><router-link to="/danh-sach/hoan-thanh" class="hover:text-orange-500 transition-colors">Hoàn thành</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4">Liên Hệ</h4>
          <p class="text-sm leading-relaxed">
            Email: contact@truyenchua.com<br/>
            Mọi góp ý, báo lỗi xin vui lòng liên hệ qua email.
          </p>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/5 pt-8 text-center text-sm">
        <p>&copy; 2024 Truyện Chùa. All rights reserved.</p>
        <p class="mt-2 text-xs text-gray-500">
          Nội dung truyện thuộc bản quyền của tác giả và nhà xuất bản.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component for comic website
</script>
