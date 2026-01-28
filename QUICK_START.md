# Quick Start Guide - SWATHI E-commerce

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 2. Navigate the Application

**Home Page** (`/`)
- View hero section with brand messaging
- Browse featured products
- Click "Shop Now" to see all products

**Shop Page** (`/shop`)
- Filter products by category
- Click on any product card to view details
- Add products to cart directly from cards

**Product Details** (`/shop/:id`)
- View detailed product information
- See related products
- Add to cart with quantity

**Cart** (`/cart`)
- Review cart items
- Update quantities or remove items
- See order summary with totals

**Login/Register** (`/login`, `/register`)
- View authentication UI (demo only)
- Forms are functional but don't connect to backend

## 🎨 Customization Guide

### Change Brand Colors

Edit `src/index.css` - modify the CSS variables:
```css
--primary: 220.9 39.3% 11%;
--secondary: 220 14.3% 95.9%;
```

Or use Tailwind classes in components:
- Replace `from-pink-400 to-purple-400` with your gradient
- Replace `text-pink-500` with your accent color

### Add More Products

Edit `src/data/mockData.js`:
```javascript
{
  id: 13,
  name: "Your Product Name",
  category: "Skincare", // Must match existing category
  price: 29.99,
  image: "https://images.unsplash.com/...",
  description: "Product description",
  rating: 4.5,
  inStock: true
}
```

### Add New Categories

1. Add to `categories` array in `src/data/mockData.js`
2. Add products with that category
3. Filter will automatically work

### Modify Layout

All components use Tailwind classes:
- Change `max-w-7xl` to adjust container width
- Modify `grid-cols-*` for different grid layouts
- Update `gap-*` for spacing

## 📱 Testing Responsive Design

### Browser DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

### Key Breakpoints
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## 🛠️ Common Tasks

### Add a New Page

1. Create page component in `src/pages/`:
```javascript
// src/pages/About.jsx
export const About = () => {
  return <div>About Page</div>;
};
```

2. Add route in `src/App.jsx`:
```javascript
import { About } from '@/pages/About';

// In Routes:
<Route path="/about" element={<About />} />
```

3. Add navigation link in `src/components/Navbar.jsx`:
```javascript
<Link to="/about">About</Link>
```

### Add a New Component

1. Create in `src/components/`:
```javascript
// src/components/MyComponent.jsx
export const MyComponent = ({ prop }) => {
  return <div>{prop}</div>;
};
```

2. Import and use:
```javascript
import { MyComponent } from '@/components/MyComponent';

<MyComponent prop="value" />
```

### Modify Cart Behavior

Edit `src/context/CartContext.jsx`:
- `addToCart()` - Add items
- `removeFromCart()` - Remove items
- `updateQuantity()` - Change quantities
- `cartTotal` - Calculate total
- `cartCount` - Count items

### Change Product Images

Replace Unsplash URLs in `src/data/mockData.js` with:
- Your own hosted images
- Different Unsplash images
- Local images in `/public` folder

## 🎯 Feature Checklist

- ✅ Home page with hero and features
- ✅ Product listing with filters
- ✅ Product detail pages
- ✅ Shopping cart functionality
- ✅ Cart badge in navbar
- ✅ Responsive design
- ✅ Login/Register UI
- ✅ Category filtering
- ✅ Related products
- ✅ Empty cart state
- ✅ Stock status display
- ✅ Product ratings

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styles Not Loading
```bash
# Restart dev server
# Clear browser cache
# Check if Tailwind is configured correctly
```

### Images Not Loading
- Check internet connection (using Unsplash URLs)
- Verify image URLs are valid
- Check browser console for errors

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

Build output will be in `dist/` folder.

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 💡 Tips

1. **Use the @ alias**: Import with `@/components/...` instead of relative paths
2. **Tailwind IntelliSense**: Install VS Code extension for autocomplete
3. **Component Library**: Explore shadcn/ui for more components
4. **Hot Reload**: Changes auto-refresh in dev mode
5. **Console Logs**: Check browser console for form submissions

## 🎓 Learning Path

1. Start with Home page - understand layout
2. Explore Shop page - see filtering logic
3. Check ProductDetails - routing with params
4. Study CartContext - state management
5. Review components - reusable patterns

## ✨ Next Steps

Want to extend this project?
- Add product search functionality
- Implement wishlist feature
- Add product reviews/ratings
- Create user profile page
- Add order history
- Implement filters (price, rating)
- Add sorting options
- Create comparison feature

Remember: This is frontend-only. To make it functional, you'll need to:
- Build a backend API
- Connect to a database
- Implement real authentication
- Add payment processing
