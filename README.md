# Truyện Chùa - Comic Reading Website

🎨 A modern comic reading web application built with Vue 3, featuring the OTruyen API for Vietnamese comics.

## ✨ Features

- 📚 Browse thousands of comics from OTruyen API
- 🔍 Advanced search functionality
- 📖 Smooth comic reading experience
- 🎯 Category and status filtering
- 📱 Fully responsive design (mobile & desktop)
- 🌙 Dark theme with modern UI
- 🎭 Swiper-based banners and sliders
- ⚡ Fast page navigation with Vue Router
- 💾 State management with Pinia

## 🚀 Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **HTTP Client:** Axios
- **UI Components:** Swiper
- **Styling:** Tailwind CSS
- **Icons:** Heroicons & Lucide

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/cuongngo1121/truyen-chua.git

# Navigate to project directory
cd truyen-chua-vite

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Project Structure

```
truyen-chua-vite/
├── src/
│   ├── api/              # API configuration
│   ├── components/       # Reusable Vue components
│   ├── views/            # Page components
│   ├── stores/           # Pinia stores
│   ├── router/           # Vue Router config
│   ├── directives/       # Custom directives
│   └── style.css         # Global styles
├── public/               # Static assets
└── index.html            # Entry HTML
```

## 🌐 API Integration

This project uses the **OTruyen API** for comic data:
- Base URL: `https://otruyenapi.com/v1/api`
- CDN: `https://img.otruyenapi.com`

## 🎨 Key Features Implemented

### 1. Home Page
- Featured comics banner with auto-play
- Trending comics grid
- Multiple category sliders (New, Ongoing, Completed)

### 2. Comic Detail
- Cover image and metadata display
- Full chapter list
- Category tags with navigation
- "Read from beginning" button

### 3. Comic Reader
- Vertical scroll reading mode
- Chapter navigation (previous/next)
- Fullscreen toggle
- Loading states

### 4. Search & Filters
- Keyword search with pagination
- Filter by category
- Filter by status (New, Ongoing, Completed)

## 📱 Responsive Design

- Mobile-first approach
- Bottom navigation for mobile
- Adaptive grid layouts (2/4/6 columns)
- Touch-friendly interactions

## 🎭 UI Components

- **Banner**: Swiper carousel for featured comics
- **ComicCard**: Reusable card with hover effects
- **ComicSlider**: Horizontal scrolling slider
- **NavBar**: Responsive navigation with search
- **BottomNav**: Mobile bottom navigation
- **Footer**: Site information and links

## 🔧 Configuration

The project includes:
- Tailwind CSS configuration
- Vite build optimization
- Vue Router with dynamic titles
- Axios client with timeout settings

## 📄 License

MIT

## 👨‍💻 Author

Cuong Ngo

## 🙏 Credits

- Comic data provided by [OTruyen API](https://otruyenapi.com)
- Built with ❤️ using Vue 3
