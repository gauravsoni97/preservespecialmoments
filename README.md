# Preserve Special Moments - Ecommerce Website

An enhanced ecommerce website with product detail pages, smooth scrolling, animations, and more.

## Features Implemented

1. **Product Detail Page**
   - Clicking on any product image redirects to a dedicated product detail page
   - Magnified image view on hover (similar to Flipkart or Amazon)
   - Product information display with materials, customization options, and ratings

2. **Enhanced Checkout Experience**
   - Dynamic QR code for payment in the "Complete Your Order" modal
   - Currency set to Indian Rupees (₹)
   - WhatsApp integration for payment confirmation

3. **Smooth Scrolling & Animations**
   - Lenis for smooth scroll animation and page transitions
   - Framer Motion for animations throughout the site
   - Page transition animations between home and product detail pages

4. **Cross-Selling**
   - "Explore More" section on product detail pages showing related products
   - Interactive product cards with hover effects

5. **Responsive Design**
   - Fully responsive layout that works on all device sizes
   - Mobile-friendly navigation and shopping cart

## Technologies Used

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- Lenis for smooth scrolling
- Framer Motion for animations
- QRCode.react for payment QR codes
- Lucide React for icons

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Key Components

- `App.tsx`: Main application with routing and global state
- `components/ProductDetailPage.tsx`: Dedicated product detail page with magnified image view
- `hooks/useLenisScroll.ts`: Custom hook for Lenis smooth scrolling

## Features Overview

### Product Detail Page
- When a user clicks on a product image from the main page, they are redirected to a product detail page
- The product detail page features a magnifying glass effect on hover to zoom into product images
- Users can select different product images using thumbnail navigation

### Checkout Process
- The "Proceed to Checkout" modal now features a dynamic QR code for payments
- All prices are displayed in Indian Rupees (₹)
- After scanning the QR code, users can confirm payment via WhatsApp

### Smooth Scrolling & Animations
- Lenis library provides smooth scrolling throughout the site
- Framer Motion adds subtle animations to page transitions and interactive elements
- Product cards have hover animations for better user engagement

### Cross-Selling
- Each product detail page includes an "Explore More" section with related products
- These products are displayed in an attractive grid with hover effects
- Clicking on related products navigates to their detail pages

## Customization

You can customize the following aspects:
- Product data in the `products` array in `App.tsx`
- Related products in the `relatedProducts` array in `ProductDetailPage.tsx`
- Colors and styling through Tailwind CSS classes
- Payment UPI ID in the QR code generation component

## Deployment

To deploy the website:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting platform (Vercel, Netlify, etc.)