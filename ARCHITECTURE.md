# Component Architecture & Data Flow

## Component Hierarchy

```
App.jsx
├── BrowserRouter
│   └── CartProvider (Context)
│       └── Layout
│           ├── Navbar
│           │   ├── Logo (Link to /)
│           │   ├── Navigation Links
│           │   │   ├── Home (/)
│           │   │   └── Shop (/shop)
│           │   └── Actions
│           │       ├── User Icon (→ /login)
│           │       └── Cart Icon (→ /cart) [with badge]
│           │
│           ├── Main (Routes)
│           │   ├── Home (/)
│           │   │   ├── Hero Section
│           │   │   ├── Features Grid
│           │   │   ├── Featured Products
│           │   │   │   └── ProductCard × 4
│           │   │   └── Newsletter CTA
│           │   │
│           │   ├── Shop (/shop)
│           │   │   ├── Header
│           │   │   ├── CategoryFilter
│           │   │   └── Products Grid
│           │   │       └── ProductCard × N
│           │   │
│           │   ├── ProductDetails (/shop/:id)
│           │   │   ├── Back Button
│           │   │   ├── Product Image
│           │   │   ├── Product Info
│           │   │   ├── Add to Cart Button
│           │   │   └── Related Products
│           │   │       └── ProductCard × 4
│           │   │
│           │   ├── Cart (/cart)
│           │   │   ├── Cart Items
│           │   │   │   └── CartItem × N
│           │   │   └── Order Summary
│           │   │
│           │   ├── Login (/login)
│           │   │   ├── Logo
│           │   │   ├── Login Form
│           │   │   └── Register Link
│           │   │
│           │   └── Register (/register)
│           │       ├── Logo
│           │       ├── Register Form
│           │       └── Login Link
│           │
│           └── Footer
│               ├── Brand Section
│               ├── Quick Links
│               ├── Support Links
│               └── Social Icons
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CartContext                          │
│  State: cartItems, cartTotal, cartCount                     │
│  Actions: addToCart, removeFromCart, updateQuantity         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Provides
                              ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│   Navbar     │                          │  ProductCard │
│              │                          │              │
│ - Displays   │                          │ - Calls      │
│   cartCount  │                          │   addToCart()│
└──────────────┘                          └──────────────┘
        │                                         │
        │                                         │
        ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│   Cart Page  │                          │   CartItem   │
│              │                          │              │
│ - Displays   │                          │ - Calls      │
│   cartItems  │                          │   update     │
│ - Shows      │                          │   Quantity() │
│   cartTotal  │                          │ - Calls      │
│              │                          │   remove     │
│              │                          │   FromCart() │
└──────────────┘                          └──────────────┘
```

## State Management Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      mockData.js                             │
│  - products[] (12 items)                                     │
│  - categories[] (7 items)                                    │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ Import
                              ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│  Home Page   │                          │  Shop Page   │
│              │                          │              │
│ - Slices     │                          │ - Filters    │
│   products   │                          │   products   │
│   (0-4)      │                          │   by category│
└──────────────┘                          └──────────────┘
        │                                         │
        │                                         │
        ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│ ProductCard  │                          │CategoryFilter│
│              │                          │              │
│ - Displays   │                          │ - Updates    │
│   product    │                          │   selected   │
│   data       │                          │   category   │
└──────────────┘                          └──────────────┘
```

## User Interaction Flow

```
User Journey: Browse → View → Add to Cart → Checkout

1. HOME PAGE (/)
   │
   ├─→ Click "Shop Now" ──────────────────────┐
   │                                           │
   └─→ Click Featured Product ────────────┐   │
                                          │   │
2. SHOP PAGE (/shop)                      │   │
   │                                      │   │
   ├─→ Filter by Category ◄───────────────┘   │
   │                                           │
   └─→ Click Product Card ────────────────┐   │
                                          │   │
3. PRODUCT DETAILS (/shop/:id)            │   │
   │                                      │   │
   ├─→ Click "Add to Cart" ──────────────┼───┼──┐
   │                                      │   │  │
   └─→ Click Related Product ─────────────┘   │  │
                                              │  │
4. CART ICON (Navbar)                         │  │
   │                                          │  │
   └─→ Click Cart Icon ◄──────────────────────┘  │
                                                 │
5. CART PAGE (/cart)                             │
   │                                             │
   ├─→ Update Quantity ◄─────────────────────────┘
   │
   ├─→ Remove Item
   │
   └─→ Click "Proceed to Checkout"
       (Demo - no actual checkout)
```

## Component Props Flow

```
ProductCard Component
├── Props IN:
│   └── product: {
│       id, name, category, price,
│       image, description, rating, inStock
│   }
├── Uses Context:
│   └── addToCart(product)
└── Renders:
    ├── Image
    ├── Category Badge
    ├── Name & Rating
    ├── Price
    └── Add to Cart Button

CartItem Component
├── Props IN:
│   └── item: {
│       id, name, category, price,
│       image, quantity
│   }
├── Uses Context:
│   ├── updateQuantity(id, quantity)
│   └── removeFromCart(id)
└── Renders:
    ├── Image
    ├── Product Info
    ├── Quantity Controls
    └── Remove Button

CategoryFilter Component
├── Props IN:
│   ├── categories: string[]
│   ├── selectedCategory: string
│   └── onSelectCategory: function
└── Renders:
    └── Button × categories.length
```

## Routing Flow

```
URL Navigation:

/                    → Home Page
                       ├── Hero
                       ├── Features
                       ├── Featured Products
                       └── Newsletter

/shop                → Shop Page
                       ├── Category Filter
                       └── All Products Grid

/shop/:id            → Product Details
                       ├── Product Info
                       ├── Add to Cart
                       └── Related Products

/cart                → Cart Page
                       ├── Cart Items
                       └── Order Summary

/login               → Login Page
                       └── Login Form

/register            → Register Page
                       └── Register Form
```

## Context API Structure

```javascript
CartContext
│
├── State
│   └── cartItems: [
│       {
│         id: number,
│         name: string,
│         price: number,
│         quantity: number,
│         image: string,
│         category: string
│       }
│   ]
│
├── Computed Values
│   ├── cartTotal: number (sum of price × quantity)
│   └── cartCount: number (sum of quantities)
│
└── Actions
    ├── addToCart(product)
    │   └── Adds product or increments quantity
    │
    ├── removeFromCart(productId)
    │   └── Removes product from cart
    │
    └── updateQuantity(productId, quantity)
        └── Updates quantity or removes if 0
```

## Component Reusability

```
Reusable Components:

ProductCard
├── Used in: Home (4×), Shop (12×), ProductDetails (4×)
└── Total instances: ~20

Button (shadcn/ui)
├── Used in: All pages
└── Variants: default, outline, ghost

Card (shadcn/ui)
├── Used in: ProductCard, Cart
└── Provides consistent styling

Input (shadcn/ui)
├── Used in: Login, Register, Home (newsletter)
└── Consistent form styling

Label (shadcn/ui)
├── Used in: Login, Register
└── Accessible form labels
```

## Event Flow Example

```
User clicks "Add to Cart" on ProductCard:

1. ProductCard
   └── onClick={() => addToCart(product)}

2. CartContext
   └── addToCart(product) {
       ├── Check if product exists in cart
       ├── If yes: increment quantity
       ├── If no: add with quantity = 1
       └── Update cartItems state
   }

3. State Update Triggers Re-render
   ├── Navbar
   │   └── cartCount updates (badge)
   └── Cart Page (if open)
       └── cartItems updates (list)

4. User sees:
   ├── Cart badge number increases
   └── Visual feedback (button state)
```

## Styling Architecture

```
Tailwind CSS Classes
│
├── Layout
│   ├── Flexbox (flex, flex-col, items-center)
│   ├── Grid (grid, grid-cols-*)
│   └── Spacing (p-*, m-*, gap-*)
│
├── Colors
│   ├── Gradients (from-pink-400 to-purple-400)
│   ├── Text (text-gray-*)
│   └── Backgrounds (bg-white, bg-gray-50)
│
├── Typography
│   ├── Sizes (text-sm, text-xl, text-4xl)
│   └── Weights (font-medium, font-bold)
│
├── Effects
│   ├── Shadows (shadow-sm, shadow-xl)
│   ├── Rounded (rounded-xl, rounded-full)
│   └── Transitions (transition, hover:*)
│
└── Responsive
    ├── sm: (640px+)
    ├── md: (768px+)
    ├── lg: (1024px+)
    └── xl: (1280px+)
```

This architecture ensures:
- ✅ Clear component hierarchy
- ✅ Predictable data flow
- ✅ Reusable components
- ✅ Maintainable code
- ✅ Scalable structure
