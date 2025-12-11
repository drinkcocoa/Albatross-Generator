# Image Optimization Guide

This guide explains how to optimize the background images in the Albatross Generator for better performance and faster loading times.

## Current Image Sizes

The project currently includes 4 background images:
- `backImage1.jpg` - ~145 KB
- `backImage2.jpg` - ~103 KB
- `backImage3.jpg` - ~128 KB
- `backImage4.jpg` - ~84 KB

**Total size: ~460 KB**

## Why Optimize?

- Faster page load times
- Reduced bandwidth usage
- Better performance on mobile devices
- Improved user experience

## Recommended Tools

### Online Tools (No Installation Required)

1. **TinyJPG** (https://tinyjpg.com/)
   - Drag and drop images
   - Automatically compresses with smart lossy compression
   - Usually achieves 50-70% size reduction
   - Free for up to 20 images

2. **Squoosh** (https://squoosh.app/)
   - Web-based image compressor by Google
   - Real-time preview of quality
   - Support for modern formats (WebP, AVIF)
   - Complete control over compression settings

3. **CompressJPEG** (https://compressjpeg.com/)
   - Batch compression
   - Simple interface
   - Free and fast

### Command-Line Tools

#### ImageMagick

Install:
```bash
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

# Windows
# Download from https://imagemagick.org/
```

Optimize images:
```bash
# Basic compression (80% quality)
mogrify -quality 80 assets/images/*.jpg

# Aggressive compression (70% quality)
mogrify -quality 70 assets/images/*.jpg

# Resize and compress
mogrify -resize 1920x1080 -quality 80 assets/images/*.jpg
```

#### JPEGoptim

Install:
```bash
# macOS
brew install jpegoptim

# Ubuntu/Debian
sudo apt-get install jpegoptim
```

Optimize:
```bash
# Optimize to max quality 85
jpegoptim --max=85 assets/images/*.jpg

# Strip metadata and optimize
jpegoptim --strip-all --max=80 assets/images/*.jpg
```

#### MozJPEG

Install:
```bash
# macOS
brew install mozjpeg

# Ubuntu/Debian
sudo apt-get install mozjpeg
```

Optimize:
```bash
# Using cjpeg from mozjpeg
for img in assets/images/*.jpg; do
  cjpeg -quality 85 "$img" > "${img%.jpg}_optimized.jpg"
done
```

## Step-by-Step Process

### Method 1: Using TinyJPG (Easiest)

1. Go to https://tinyjpg.com/
2. Upload all 4 background images
3. Download the compressed versions
4. Replace the original files in `assets/images/`

### Method 2: Using Squoosh (Best Control)

1. Go to https://squoosh.app/
2. Upload one image at a time
3. Adjust quality slider to find the sweet spot (usually 75-85)
4. Compare original vs compressed in the preview
5. Download and replace original

### Method 3: Using ImageMagick (Batch Processing)

```bash
# Navigate to project directory
cd Albatross-Generator

# Backup originals
cp -r assets/images assets/images_backup

# Optimize all JPEGs at 80% quality
mogrify -quality 80 assets/images/*.jpg

# Check file sizes
ls -lh assets/images/*.jpg
```

## Modern Image Formats

Consider converting to WebP or AVIF for even better compression:

### Using Squoosh
1. Upload JPG to Squoosh
2. Select WebP or AVIF from dropdown
3. Download converted image
4. Update `sketch.js` to load WebP/AVIF files

### Using ImageMagick
```bash
# Convert to WebP
mogrify -format webp -quality 85 assets/images/*.jpg

# Convert to AVIF (requires libavif)
mogrify -format avif -quality 85 assets/images/*.jpg
```

**Note**: If using WebP/AVIF, update the file extensions in `sketch.js`:
```javascript
backImage1 = loadImage('assets/images/backImage1.webp');
```

## Expected Results

With proper optimization, you should achieve:
- 30-50% size reduction with minimal quality loss
- Total background images size: ~200-250 KB (from ~460 KB)
- Faster initial load time
- Better mobile performance

## Quality Guidelines

- **Quality 95-100**: Nearly lossless, large files
- **Quality 85-95**: Excellent quality, good compression
- **Quality 75-85**: Very good quality, better compression ⭐ **Recommended**
- **Quality 60-75**: Good quality, high compression
- **Quality < 60**: Visible artifacts, not recommended

## Testing After Optimization

1. Open `index.html` in browser
2. Check Network tab in DevTools (F12)
3. Verify image sizes have decreased
4. Visually inspect backgrounds for quality
5. Test on mobile devices

## Automated Optimization

You can add a build script to automatically optimize images:

```json
{
  "scripts": {
    "optimize-images": "imagemagick mogrify -quality 80 assets/images/*.jpg"
  }
}
```

## Best Practices

1. ✅ Keep original images backed up
2. ✅ Test on multiple devices after optimization
3. ✅ Use progressive JPEG for better perceived loading
4. ✅ Consider lazy loading for better performance
5. ✅ Use appropriate quality settings (80-85 is usually ideal)
6. ⚠️ Don't over-optimize - balance size vs quality
7. ⚠️ Avoid re-compressing already optimized images

## Additional Resources

- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Test your site performance
- [WebP Converter](https://cloudconvert.com/jpg-to-webp) - Convert to WebP format
- [AVIF Converter](https://avif.io/) - Convert to AVIF format
- [ImageOptim (Mac)](https://imageoptim.com/) - GUI tool for Mac users

---

**After optimization, don't forget to test the application to ensure all images load correctly!**
