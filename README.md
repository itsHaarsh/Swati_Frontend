# SWATHI - Health & Cosmetics E-commerce Frontend

A modern, responsive e-commerce frontend for health and beauty products built with React, Vite, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Modern UI/UX**: Clean, pastel-themed design with soft shadows and rounded corners
- **Responsive Design**: Mobile-first approach, works on all devices
- **Product Catalog**: Browse products with category filtering
- **Product Details**: Detailed product pages with related items
- **Shopping Cart**: Add, remove, and update quantities
- **Authentication UI**: Login and register pages (UI only, no backend)
- **React Router**: Client-side routing for seamless navigation

## 📁 Project Structure

```
SWATHI-frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navbar.jsx       # Navigation bar with cart count
│   │   ├── Footer.jsx       # Footer with links and social
│   │   ├── ProductCard.jsx  # Product display card
│   │   ├── CategoryFilter.jsx # Category filter buttons
│   │   └── CartItem.jsx     # Cart item with quantity controls
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with hero and featured products
│   │   ├── Shop.jsx         # Product listing with filters
│   │   ├── ProductDetails.jsx # Individual product page
│   │   ├── Cart.jsx         # Shopping cart page
│   │   ├── Login.jsx        # Login form (UI only)
│   │   └── Register.jsx     # Registration form (UI only)
│   ├── context/
│   │   └── CartContext.jsx  # Cart state management
│   ├── data/
│   │   └── mockData.js      # Mock product data
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: Pink (400-500) to Purple (400-500) gradient
- **Background**: White with soft pastel accents (pink-50, purple-50, blue-50)
- **Text**: Gray scale (600-900)
- **Accents**: Soft pastels for features and highlights

### Components
- **Cards**: Rounded-xl with soft shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Clean borders with focus states
- **Images**: Aspect-square with rounded corners

## 🗺️ Routes

- `/` - Home page
- `/shop` - Product listing
- `/shop/:id` - Product details
- `/cart` - Shopping cart
- `/login` - Login page (UI only)
- `/register` - Register page (UI only)

## 📊 Mock Data

The application uses mock data located in `src/data/mockData.js`:
- 12 sample products across 6 categories
- Product properties: id, name, category, price, image, description, rating, inStock
- Categories: Skincare, Makeup, Wellness, Body Care, Hair Care, Tools

## 🛒 Cart Functionality

Cart state is managed using React Context (`CartContext.jsx`):
- Add products to cart
- Update quantities
- Remove items
- Calculate totals
- Persist cart count in navbar

## 🎯 Key Features

### Home Page
- Hero section with CTA
- Feature highlights (Natural Ingredients, Dermatologist Tested, Cruelty Free)
- Featured products grid
- Newsletter subscription section

### Shop Page
- Category filter buttons
- Product grid layout
- Product count display
- Responsive grid (1-4 columns)

### Product Details
- Large product image
- Product information and pricing
- Star ratings
- Stock status
- Add to cart functionality
- Related products section

### Cart Page
- Cart items with quantity controls
- Order summary with subtotal, shipping, and tax
- Empty cart state
- Continue shopping link

### Auth Pages
- Clean form layouts
- Input validation (HTML5)
- Links between login/register
- Disclaimer about demo UI

## 🚫 What's NOT Included

This is a **frontend-only** project. The following are NOT implemented:
- Backend API integration
- Real authentication/authorization
- Database connections
- Payment processing
- User account management
- Admin dashboard
- Real product data fetching

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl)

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` and `src/index.css` to modify the color scheme.

### Adding Products
Edit `src/data/mockData.js` to add or modify products.

### Modifying Layout
Components use Tailwind utility classes for easy customization.

## 📝 Notes

- All images use Unsplash placeholder URLs
- No actual authentication is performed
- Cart state is lost on page refresh (no persistence)
- All forms are UI-only with console.log outputs

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project for learning or as a template.
