#!/bin/bash
# scripts/optimize_category_images.sh
# Category image optimization script for 2WATUJU project (Ubuntu compatible)

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏷️  Starting category image optimization for 2WATUJU...${NC}"

# Check for ImageMagick - try different command names
MAGICK_CMD=""
WEBP_SUPPORT=false

if command -v magick &> /dev/null; then
    MAGICK_CMD="magick"
    echo -e "${GREEN}✅ Found ImageMagick: magick command${NC}"
    # Check WebP support
    if magick -list delegate | grep -i webp > /dev/null 2>&1; then
        echo -e "${GREEN}✅ WebP support detected in ImageMagick${NC}"
        WEBP_SUPPORT=true
    else
        echo -e "${YELLOW}⚠️ WebP delegate not found in ImageMagick${NC}"
    fi
elif command -v convert &> /dev/null; then
    MAGICK_CMD="convert"
    echo -e "${GREEN}✅ Found ImageMagick: convert command${NC}"
    # Check WebP support
    if convert -list delegate | grep -i webp > /dev/null 2>&1; then
        echo -e "${GREEN}✅ WebP support detected in ImageMagick${NC}"
        WEBP_SUPPORT=true
    else
        echo -e "${YELLOW}⚠️ WebP delegate not found in ImageMagick${NC}"
    fi
else
    echo -e "${RED}❌ ImageMagick not found. Please install it first:${NC}"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check for alternative WebP tools if ImageMagick lacks WebP support
ALTERNATIVE_METHOD=false
if [ "$WEBP_SUPPORT" = false ]; then
    if command -v cwebp &> /dev/null && command -v dwebp &> /dev/null; then
        echo -e "${BLUE}🔄 Found WebP tools (cwebp/dwebp) - will use alternative method${NC}"
        ALTERNATIVE_METHOD=true
    else
        echo -e "${YELLOW}⚠️ Limited WebP support detected. Install WebP tools:${NC}"
        echo "  Ubuntu: sudo apt-get install webp"
        echo "  This may cause issues with WebP files."
        echo ""
    fi
fi

# Check if we're in the right directory
if [ ! -d "static" ]; then
    echo -e "${RED}❌ This script should be run from your project root directory${NC}"
    echo -e "${YELLOW}💡 Current directory: $(pwd)${NC}"
    echo -e "${YELLOW}💡 Expected: A directory containing 'static' folder${NC}"
    exit 1
fi

# Check if source directory exists
SOURCE_DIR="static/source/category"
DEST_DIR="static/assets/category"

if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}❌ Source directory not found: $SOURCE_DIR${NC}"
    echo -e "${YELLOW}💡 Please create the directory and add your source images${NC}"
    exit 1
fi

# Create destination directory if it doesn't exist
if [ ! -d "$DEST_DIR" ]; then
    echo -e "${YELLOW}📁 Creating destination directory: $DEST_DIR${NC}"
    mkdir -p "$DEST_DIR"
fi

# Check if there are any images to process
IMAGE_COUNT=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) | wc -l)

if [ "$IMAGE_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ No images found in $SOURCE_DIR${NC}"
    echo -e "${YELLOW}💡 Supported formats: JPG, JPEG, PNG, WebP, GIF${NC}"
    echo -e "${YELLOW}💡 Current files in $SOURCE_DIR:${NC}"
    ls -la "$SOURCE_DIR" 2>/dev/null || echo "  Directory is empty"
    exit 1
fi

echo -e "${GREEN}✅ Found $IMAGE_COUNT image(s) to process${NC}"
echo ""

# Counter for processed files
PROCESSED=0
FAILED=0

# Process each image file
find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) | while read -r image_path; do
    # Get filename without extension and path
    filename=$(basename "$image_path")
    name_only="${filename%.*}"
    
    echo -e "${BLUE}🖼️  Processing: $filename${NC}"
    
    # Check if file can be processed with detailed error reporting
    echo -e "${YELLOW}   🔍 Checking file format...${NC}"
    
    # Try multiple ways to identify the file
    FILE_OK=false
    
    # Method 1: Use file command
    if file "$image_path" | grep -i -E "(webp|jpeg|jpg|png|gif)" > /dev/null; then
        echo -e "${GREEN}   ✅ File type detected by 'file' command${NC}"
        FILE_OK=true
    fi
    
    # Method 2: Try ImageMagick identify with better error handling
    if [ "$MAGICK_CMD" = "magick" ]; then
        IDENTIFY_CMD="magick identify"
    else
        IDENTIFY_CMD="identify"
    fi
    
    if $IDENTIFY_CMD "$image_path" &>/dev/null; then
        echo -e "${GREEN}   ✅ ImageMagick can identify the file${NC}"
        FILE_OK=true
    else
        echo -e "${YELLOW}   ⚠️ ImageMagick identify failed: $(basename "$image_path")${NC}"
        IDENTIFY_ERROR=$($IDENTIFY_CMD "$image_path" 2>&1)
        echo -e "${YELLOW}   Error details: $IDENTIFY_ERROR${NC}"
        
        # Check if it's a WebP delegate issue
        if echo "$IDENTIFY_ERROR" | grep -i "delegate" > /dev/null; then
            echo -e "${RED}   🚨 WebP delegate missing! Installing webp support required.${NC}"
        fi
    fi
    
    if [ "$FILE_OK" = false ]; then
        echo -e "${RED}   ❌ Cannot process $filename - skipping${NC}"
        ((FAILED++))
        continue
    fi
    
    # Create variants with proper aspect ratios and cropping
    # Using ^ modifier to ensure minimum dimensions, then crop to exact size
    
    # If we need to use alternative method for WebP files
    if [ "$ALTERNATIVE_METHOD" = true ] && [[ "${filename,,}" == *.webp ]]; then
        echo -e "${BLUE}   🔄 Using WebP tools for processing...${NC}"
        
        # Convert WebP to temporary PNG first
        TEMP_PNG="/tmp/${name_only}_temp.png"
        if ! dwebp "$image_path" -o "$TEMP_PNG" 2>/dev/null; then
            echo -e "${RED}   ❌ Failed to decode WebP file${NC}"
            ((FAILED++))
            continue
        fi
        
        # Process the temporary PNG and convert back to WebP
        # Mobile: 400x300 (4:3 ratio)
        TEMP_MOBILE="/tmp/${name_only}_mobile.png"
        if $MAGICK_CMD "$TEMP_PNG" -resize 400x300^ -gravity center -extent 400x300 "$TEMP_MOBILE" 2>/dev/null && \
           cwebp -q 85 "$TEMP_MOBILE" -o "$DEST_DIR/${name_only}-mobile.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Mobile variant: ${name_only}-mobile.webp (400x300)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create mobile variant${NC}"
            rm -f "$TEMP_PNG" "$TEMP_MOBILE"
            ((FAILED++))
            continue
        fi
        
        # Tablet: 600x450 (4:3 ratio)
        TEMP_TABLET="/tmp/${name_only}_tablet.png"
        if $MAGICK_CMD "$TEMP_PNG" -resize 600x450^ -gravity center -extent 600x450 "$TEMP_TABLET" 2>/dev/null && \
           cwebp -q 85 "$TEMP_TABLET" -o "$DEST_DIR/${name_only}-tablet.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Tablet variant: ${name_only}-tablet.webp (600x450)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create tablet variant${NC}"
            rm -f "$TEMP_PNG" "$TEMP_MOBILE" "$TEMP_TABLET"
            ((FAILED++))
            continue
        fi
        
        # Desktop: 800x600 (4:3 ratio)
        TEMP_DESKTOP="/tmp/${name_only}_desktop.png"
        if $MAGICK_CMD "$TEMP_PNG" -resize 800x600^ -gravity center -extent 800x600 "$TEMP_DESKTOP" 2>/dev/null && \
           cwebp -q 85 "$TEMP_DESKTOP" -o "$DEST_DIR/${name_only}-desktop.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Desktop variant: ${name_only}-desktop.webp (800x600)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create desktop variant${NC}"
            rm -f "$TEMP_PNG" "$TEMP_MOBILE" "$TEMP_TABLET" "$TEMP_DESKTOP"
            ((FAILED++))
            continue
        fi
        
        # Thumbnail: 800x600 (same as desktop, but with different quality/optimization)
        TEMP_THUMB="/tmp/${name_only}_thumb.png"
        if $MAGICK_CMD "$TEMP_PNG" -resize 800x600^ -gravity center -extent 800x600 "$TEMP_THUMB" 2>/dev/null && \
           cwebp -q 80 "$TEMP_THUMB" -o "$DEST_DIR/${name_only}-thumbnail.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Thumbnail variant: ${name_only}-thumbnail.webp (800x600)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create thumbnail variant${NC}"
            rm -f "$TEMP_PNG" "$TEMP_MOBILE" "$TEMP_TABLET" "$TEMP_DESKTOP" "$TEMP_THUMB"
            ((FAILED++))
            continue
        fi
        
        # Clean up temporary files
        rm -f "$TEMP_PNG" "$TEMP_MOBILE" "$TEMP_TABLET" "$TEMP_DESKTOP" "$TEMP_THUMB"
        
    else
        # Use standard ImageMagick processing
        # Mobile: 400x300 (4:3 ratio)
        if $MAGICK_CMD "$image_path" -resize 400x300^ -gravity center -extent 400x300 -quality 100 "$DEST_DIR/${name_only}-mobile.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Mobile variant: ${name_only}-mobile.webp (400x300)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create mobile variant${NC}"
            ((FAILED++))
            continue
        fi
        
        # Tablet: 600x450 (4:3 ratio)
        if $MAGICK_CMD "$image_path" -resize 600x450^ -gravity center -extent 600x450 -quality 100 "$DEST_DIR/${name_only}-tablet.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Tablet variant: ${name_only}-tablet.webp (600x450)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create tablet variant${NC}"
            ((FAILED++))
            continue
        fi
        
        # Desktop: 800x600 (4:3 ratio)
        if $MAGICK_CMD "$image_path" -resize 800x600^ -gravity center -extent 800x600 -quality 100 "$DEST_DIR/${name_only}-desktop.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Desktop variant: ${name_only}-desktop.webp (800x600)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create desktop variant${NC}"
            ((FAILED++))
            continue
        fi
        
        # Thumbnail: 800x600 (same as desktop, but with different quality/optimization)
        if $MAGICK_CMD "$image_path" -resize 800x600^ -gravity center -extent 800x600 -quality 100 "$DEST_DIR/${name_only}-thumbnail.webp" 2>/dev/null; then
            echo -e "${GREEN}   ✅ Thumbnail variant: ${name_only}-thumbnail.webp (800x600)${NC}"
        else
            echo -e "${RED}   ❌ Failed to create thumbnail variant${NC}"
            ((FAILED++))
            continue
        fi
    fi
    
    ((PROCESSED++))
    echo ""
done

# Show summary
echo -e "${BLUE}📊 Processing Summary:${NC}"
echo -e "   Processed: ${GREEN}$PROCESSED${NC} image(s)"
echo -e "   Failed: ${RED}$FAILED${NC} image(s)"
echo -e "   Total variants created: ${GREEN}$((PROCESSED * 4))${NC}"

if [ "$PROCESSED" -gt 0 ]; then
    echo ""
    echo -e "${BLUE}📁 Generated variants in $DEST_DIR:${NC}"
    ls -lh "$DEST_DIR"/*.webp 2>/dev/null | awk '{print "  " $9 ": " $5}' | head -20
    
    if [ $(ls -1 "$DEST_DIR"/*.webp 2>/dev/null | wc -l) -gt 20 ]; then
        echo "  ... and $(( $(ls -1 "$DEST_DIR"/*.webp 2>/dev/null | wc -l) - 20 )) more files"
    fi
fi

echo ""
if [ "$PROCESSED" -gt 0 ]; then
    echo -e "${GREEN}🎉 Category images optimized successfully!${NC}"
    echo ""
    echo -e "${YELLOW}🔄 Usage in your code:${NC}"
    echo "For each category image, you can now use:"
    echo ""
    echo "images: {"
    echo "  thumbnail: '/assets/category/your-image-thumbnail.webp',"
    echo "  mobile: '/assets/category/your-image-mobile.webp',"
    echo "  tablet: '/assets/category/your-image-tablet.webp',"
    echo "  desktop: '/assets/category/your-image-desktop.webp'"
    echo "}"
    echo ""
    echo -e "${BLUE}📋 Naming convention:${NC}"
    echo "  Original: image.jpg"
    echo "  Generated: image-mobile.webp, image-tablet.webp, image-desktop.webp, image-thumbnail.webp"
else
    echo -e "${YELLOW}⚠️  No images were successfully processed${NC}"
    echo ""
    echo -e "${RED}🚨 Troubleshooting WebP issues:${NC}"
    echo "1. Install WebP support for ImageMagick:"
    echo "   sudo apt-get install libwebp-dev"
    echo "   sudo apt-get install imagemagick --reinstall"
    echo ""
    echo "2. Install WebP tools directly:"
    echo "   sudo apt-get install webp"
    echo ""
    echo "3. Check if your WebP files are valid:"
    echo "   file static/source/category/*.webp"
    echo ""
    echo "4. Convert problematic WebP files to PNG first:"
    echo "   cd static/source/category"
    echo "   for f in *.webp; do dwebp \"\$f\" -o \"\${f%.webp}.png\"; done"
    echo ""
    echo "5. Run the diagnostic script:"
    echo "   ./scripts/diagnose_webp.sh"
    echo ""
    echo -e "${BLUE}💡 Alternative: Use PNG/JPG source images instead of WebP${NC}"
fi

echo ""
echo -e "${BLUE}🎯 Image specifications created:${NC}"
echo "  Mobile: 400×300 (4:3 ratio) - Quality 100%"
echo "  Tablet: 600×450 (4:3 ratio) - Quality 100%"
echo "  Desktop: 800×600 (4:3 ratio) - Quality 100%"
echo "  Thumbnail: 800×600 (4:3 ratio) - Quality 100%"