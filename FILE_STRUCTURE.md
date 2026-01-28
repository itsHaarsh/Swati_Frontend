# File Structure Reference

## Complete File Tree

```
SWATHI-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                      # shadcn/ui components (pre-installed)
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   ├── form.jsx
│   │   │   ├── input.jsx
│   │   │   └── label.jsx
│   │   ├── Navbar.jsx               # ✅ Created - Navigation with cart badge
│   │   ├── Footer.jsx               # ✅ Created - Footer with links
│   │   ├── ProductCard.jsx          # ✅ Created - Product display card
│   │   ├── CategoryFilter.jsx       # ✅ Created - Category filter buttons
│   │   └── CartItem.jsx             # ✅ Created - Cart item component
│   ├── pages/
│   │   ├── Home.jsx                 # ✅ Created - Landing page
│   │   ├── Shop.jsx                 # ✅ Created - Product listing
│   │   ├── ProductDetails.jsx       # ✅ Created - Product detail page
│   │   ├── Cart.jsx                 # ✅ Created - Shopping cart
│   │   ├── Login.jsx                # ✅ Created - Login form
│   │   └── Register.jsx             # ✅ Created - Registration form
│   ├── context/
│   │   └── CartContext.jsx          # ✅ Created - Cart state management
│   ├── data/
│   │   └── mockData.js              # ✅ Created - Mock product data
│   ├── lib/
│   │   └── utils.js                 # Pre-existing utility functions
│   ├── App.jsx                      # ✅ Updated - Router setup
│   ├── main.jsx                     # Pre-existing entry point
│   └── index.css                    # ✅ Updated - Global styles
├── public/
├── package.json                     # Pre-existing dependencies
├── tailwind.config.js               # Pre-existing Tailwind config
├── vite.config.js                   # Pre-existing Vite config
├── jsconfig.json                    # Pre-existing path aliases
└── README.md                        # ✅ Created - Documentation
```

## Component Descriptions

### Layout Components

**Navbar.jsx**
- Sticky navigation bar
- Logo with gradient text
- Navigation links (Home, Shop)
- User icon (links to login)
- Cart icon with item count badge
- Mobile menu button

**Footer.jsx**
- Brand section with logo
- Quick links (Shop categories)
- Customer service links
- Social media icons
- Copyright notice

### Product Components

**ProductCard.jsx**
- Product image with hover effect
- Category badge
- Product name and rating
- Price display
- Add to cart button
- Out of stock overlay

**CategoryFilter.jsx**
- Filter buttons for categories
- Active state styling
- Gradient button for selected category

**CartItem.jsx**
- Product thumbnail
- Product details (name, category, price)
- Quantity controls (+/-)
- Remove button
- Subtotal calculation

### Pages

**Home.jsx**
- Hero section with CTA
- Feature highlights (3 columns)
- Featured products grid (4 products)
- Newsletter subscription section

**Shop.jsx**
- Page header with product count
- Category filter
- Product grid (responsive 1-4 columns)
- Empty state for no results

**ProductDetails.jsx**
- Large product image
- Product information
- Star rating display
- Stock status badge
- Add to cart button
- Wishlist button
- Shipping/return info
- Related products section

**Cart.jsx**
- Empty cart state
- Cart items list
- Order summary sidebar
- Subtotal, shipping, tax calculation
- Checkout button

**Login.jsx**
- Email and password inputs
- Remember me checkbox
- Forgot password link
- Sign up link
- Demo disclaimer

**Register.jsx**
- Full name, email, password inputs
- Confirm password field
- Terms acceptance checkbox
- Sign in link
- Demo disclaimer

### Context

**CartContext.jsx**
- Cart state management
- Add to cart function
- Remove from cart function
- Update quantity function
- Cart total calculation
- Cart count calculation

### Data

**mockData.js**
- 12 sample products
- Product schema: id, name, category, price, image, description, rating, inStock
- 7 categories: All, Skincare, Makeup, Wellness, Body Care, Hair Care, Tools

## Key Features by File

| File | Key Features |
|------|-------------|
| Navbar.jsx | Cart badge, sticky positioning, gradient logo |
| Footer.jsx | Multi-column layout, social icons |
| ProductCard.jsx | Hover effects, stock status, ratings |
| CategoryFilter.jsx | Active state, gradient styling |
| CartItem.jsx | Quantity controls, remove functionality |
| Home.jsx | Hero, features, featured products, CTA |
| Shop.jsx | Filtering, responsive grid |
| ProductDetails.jsx | Related products, detailed info |
| Cart.jsx | Order summary, empty state |
| Login/Register.jsx | Form validation, demo disclaimer |
| CartContext.jsx | Global cart state |
| mockData.js | Sample data for 12 products |

## Styling Approach

- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **Gradients**: Pink-to-purple for primary actions
- **Pastels**: Soft backgrounds (pink-50, purple-50, blue-50)
- **Rounded**: rounded-xl for cards and buttons
- **Shadows**: Soft shadows for depth
- **Responsive**: Mobile-first breakpoints

## State Management

- **Cart State**: React Context (CartContext)
- **Local State**: useState for filters, forms
- **No Redux**: Simple context is sufficient for this app

## Routing

All routes defined in App.jsx:
- `/` → Home
- `/shop` → Shop
- `/shop/:id` → ProductDetails
- `/cart` → Cart
- `/login` → Login
- `/register` → Register
