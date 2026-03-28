# Vercel Deployment Guide

## To Redeploy After Failed Deployment

### Step 1: Delete Failed Deployment
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project "Afremit-function"
3. Go to **Settings** → **Advanced** → **Delete Project**
4. Confirm the deletion

### Step 2: Redeploy from GitHub
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **Add New** → **Project**
3. Connect your GitHub repository "J-Massoda/Afremit-function"
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Root Directory**: `./frontend`
5. Add Environment Variables (if needed):
   - `VITE_API_URL`: Your backend API URL
6. Click **Deploy**

### Step 3: Verify Deployment
- Test favicon appears correctly
- Check `/assets/` folder loads properly
- Verify PartnerBannerSlider displays correctly on homepage

## What Was Fixed

### 1. Favicon Issue
- **Before**: Referenced `/vite.svg` which doesn't exist
- **After**: Now uses `/assets/afremit-logo.svg` from public folder
- **Fix**: Updated `index.html` favicon link

### 2. Static Assets Management
- **Created**: `/frontend/public/assets/` folder
- **Added**: 
  - `afremit-logo.svg` - Official logo
  - `partner-*.svg` - Partner company logos
- **Updated**: `.vercelignore` to include public/assets
- **Updated**: `vite.config.js` to ensure proper asset copying

### 3. Partner Banner Slider Component
- **Path**: `/frontend/src/components/shared/PartnerBannerSlider.jsx`
- **Features**:
  - Auto-scrolling carousel (4-second intervals)
  - Responsive (1 item mobile, 2 tablet, 3 desktop)
  - Click navigation via indicators
  - Smooth Framer Motion animations
  - Integrated into homepage

### 4. Homepage Integration
- PartnerBannerSlider added to LandingPage after "Verified Service Providers" section
- Displays trusted partner logos and descriptions

## Build & Local Testing

```bash
# Install dependencies
cd frontend
npm install

# Build project
npm run build

# Test build locally
npm run preview
```

## Troubleshooting

### Assets Not Loading
- Ensure `/frontend/public/assets/` exists with SVG files
- Run `npm run build` to verify dist/assets/ is created
- Check Network tab in browser DevTools for 404 errors

### Favicon Still Not Showing
- Clear browser cache: `Ctrl+Shift+Delete` or `Cmd+Shift+Delete`
- Check developer tools: Open console and look for favicon 404
- Verify Vercel deployment shows assets in deployment logs

### Partner Banner Not Displaying
- Check browser console for JavaScript errors
- Verify Framer Motion is installed: `npm list framer-motion`
- Ensure PartnerBannerSlider component imports are correct

## Production Notes
- All SVG logos load from `/assets/` public directory
- Banner auto-rotates every 4 seconds by default
- Responsive design adapts to all screen sizes
- No external CDN dependencies (all assets self-hosted)
