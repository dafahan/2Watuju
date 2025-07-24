#!/bin/bash
# scripts/optimize_images.sh
# Image optimization script for 2WATUJU project (Ubuntu compatible)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Starting image optimization for 2WATUJU...${NC}"

# Check for ImageMagick - try different command names
MAGICK_CMD=""
if command -v magick &> /dev/null; then
    MAGICK_CMD="magick"
    echo -e "${GREEN}✅ Found ImageMagick: magick command${NC}"
elif command -v convert &> /dev/null; then
    MAGICK_CMD="convert"
    echo -e "${GREEN}✅ Found ImageMagick: convert command${NC}"
else
    echo -e "${RED}❌ ImageMagick not found. Please install it first:${NC}"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if we're in the right directory
if [ ! -d "static" ]; then
    echo -e "${RED}❌ This script should be run from your project root directory${NC}"
    echo -e "${YELLOW}💡 Current directory: $(pwd)${NC}"
    echo -e "${YELLOW}💡 Expected: A directory containing 'static' folder${NC}"
    exit 1
fi

# Check if source images exist in static/images/
if [ ! -f "static/images/logo.webp" ]; then
    echo -e "${RED}❌ logo.webp not found in static/images/ directory${NC}"
    echo -e "${YELLOW}💡 Expected: static/images/logo.webp${NC}"
    echo -e "${YELLOW}💡 Current files in static/images/:${NC}"
    ls -la static/images/ 2>/dev/null || echo "  Directory doesn't exist"
    exit 1
fi

if [ ! -f "static/images/hero-uncompressed.webp" ]; then
    echo -e "${RED}❌ hero-uncompressed.webp not found in static/images/ directory${NC}"
    echo -e "${YELLOW}💡 Expected: static/images/hero-uncompressed.webp${NC}"
    echo -e "${YELLOW}💡 Current files in static/images/:${NC}"
    ls -la static/images/ 2>/dev/null
    exit 1
fi

if [ ! -f "static/images/dummy.webp" ]; then
    echo -e "${RED}❌ dummy.webp not found in static/images/ directory${NC}"
    echo -e "${YELLOW}💡 Expected: static/images/dummy.webp${NC}"
    echo -e "${YELLOW}💡 Current files in static/images/:${NC}"
    ls -la static/images/ 2>/dev/null
    exit 1
fi

echo -e "${BLUE}📸 Optimizing logo variants...${NC}"
# Logo variants - using existing logo as source with transparency preservation
# Use simple resize without extent to avoid cropping and white backgrounds
$MAGICK_CMD static/images/logo.webp -background transparent -resize 24x24 static/images/logo-24.webp
$MAGICK_CMD static/images/logo.webp -background transparent -resize 48x48 static/images/logo-48.webp
$MAGICK_CMD static/images/logo.webp -background transparent -resize 96x96 static/images/logo-96.webp
$MAGICK_CMD static/images/logo.webp -background transparent -resize 112x112 static/images/logo-112.webp
$MAGICK_CMD static/images/logo.webp -background transparent -resize 224x224 static/images/logo-224.webp
echo -e "${GREEN}✅ Logo variants created (5 sizes) with transparency preserved${NC}"

echo -e "${BLUE}🏠 Optimizing hero image variants...${NC}"
# Hero image variants - using brand color #56AAB7 as background (no transparency needed)
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 400x200 -gravity center -extent 400x200 -quality 80 static/images/hero-mobile-400.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 800x400 -gravity center -extent 800x400 -quality 80 static/images/hero-mobile-800.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 800x400 -gravity center -extent 800x400 -quality 80 static/images/hero-tablet-800.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 1200x600 -gravity center -extent 1200x600 -quality 85 static/images/hero-tablet-1200.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 1200x600 -gravity center -extent 1200x600 -quality 85 static/images/hero-desktop-1200.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 1600x800 -gravity center -extent 1600x800 -quality 85 static/images/hero-desktop-1600.webp
$MAGICK_CMD static/images/hero-uncompressed.webp -background "#56AAB7" -resize 2000x1000 -gravity center -extent 2000x1000 -quality 85 static/images/hero-desktop-2000.webp
echo -e "${GREEN}✅ Hero image variants created (7 sizes) with brand color background${NC}"

echo -e "${BLUE}🏘️ Optimizing project image variants...${NC}"
# Project image variants - using existing dummy as source (check if has transparency)
echo -e "${YELLOW}💡 Checking if dummy image has transparency...${NC}"

# Use the same command we detected earlier for identify
IDENTIFY_CMD=""
if [ "$MAGICK_CMD" = "magick" ]; then
    IDENTIFY_CMD="magick identify"
elif [ "$MAGICK_CMD" = "convert" ]; then
    IDENTIFY_CMD="identify"
fi

# Check for transparency
HAS_TRANSPARENCY=false
if $IDENTIFY_CMD -format "%A" static/images/dummy.webp 2>/dev/null | grep -q "True"; then
    HAS_TRANSPARENCY=true
    echo -e "${BLUE}   Dummy image has transparency, preserving it...${NC}"
else
    echo -e "${BLUE}   Dummy image has no transparency, processing normally...${NC}"
fi

# Process images based on transparency
if [ "$HAS_TRANSPARENCY" = true ]; then
    # For transparent images, use simple resize without extent to avoid cropping
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 300x188 -quality 80 static/images/dummy-mobile-300.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 600x375 -quality 80 static/images/dummy-mobile-600.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 400x250 -quality 80 static/images/dummy-tablet-400.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 600x375 -quality 80 static/images/dummy-tablet-600.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 400x250 -quality 80 static/images/dummy-desktop-400.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 600x375 -quality 80 static/images/dummy-desktop-600.webp
    $MAGICK_CMD static/images/dummy.webp -background transparent -resize 800x500 -quality 80 static/images/dummy-desktop-800.webp
else
    # For non-transparent images, use the crop method
    $MAGICK_CMD static/images/dummy.webp -resize 300x188^ -gravity center -extent 300x188 -quality 80 static/images/dummy-mobile-300.webp
    $MAGICK_CMD static/images/dummy.webp -resize 600x375^ -gravity center -extent 600x375 -quality 80 static/images/dummy-mobile-600.webp
    $MAGICK_CMD static/images/dummy.webp -resize 400x250^ -gravity center -extent 400x250 -quality 80 static/images/dummy-tablet-400.webp
    $MAGICK_CMD static/images/dummy.webp -resize 600x375^ -gravity center -extent 600x375 -quality 80 static/images/dummy-tablet-600.webp
    $MAGICK_CMD static/images/dummy.webp -resize 400x250^ -gravity center -extent 400x250 -quality 80 static/images/dummy-desktop-400.webp
    $MAGICK_CMD static/images/dummy.webp -resize 600x375^ -gravity center -extent 600x375 -quality 80 static/images/dummy-desktop-600.webp
    $MAGICK_CMD static/images/dummy.webp -resize 800x500^ -gravity center -extent 800x500 -quality 80 static/images/dummy-desktop-800.webp
fi
echo -e "${GREEN}✅ Project image variants created (7 sizes)${NC}"

# Show file sizes
echo -e "${BLUE}📊 File size comparison:${NC}"
if command -v ls &> /dev/null; then
    echo "Original files:"
    ls -lh static/images/logo.webp static/images/hero-uncompressed.webp static/images/dummy.webp 2>/dev/null | awk '{print "  " $9 ": " $5}'
    echo ""
    echo "Optimized key variants:"
    ls -lh static/images/logo-48.webp static/images/hero-mobile-400.webp static/images/dummy-desktop-400.webp 2>/dev/null | awk '{print "  " $9 ": " $5}'
fi

echo ""
echo -e "${GREEN}🎉 All images optimized successfully!${NC}"
echo -e "${BLUE}📁 Total: 19 optimized variants created in static/images/${NC}"
echo ""
echo -e "${YELLOW}🔄 Next steps:${NC}"
echo "1. Update your layout component to use:"
echo "   /images/logo-48.webp instead of the R2 URL"
echo ""
echo "2. Update your hero image to use responsive images:"
echo "   /images/hero-mobile-400.webp for mobile"
echo "   /images/hero-desktop-1200.webp for desktop"
echo ""
echo "3. Update project images to use:"
echo "   /images/dummy-desktop-400.webp"
echo ""
echo -e "${BLUE}📋 Quick test - check if files were created:${NC}"
echo "ls static/images/logo-*.webp"