# 📁 Image Assets Guide for Vidhyarthi Sewa Website

## Directory Structure

```
public/
├── images/
│   ├── logo/
│   │   ├── logo.png              # Main logo (transparent PNG, 512x512)
│   │   ├── logo-white.png        # White version for dark backgrounds
│   │   └── favicon.ico           # Browser tab icon (32x32)
│   ├── hero/
│   │   ├── hero-bg.jpg           # Hero background (1920x1080)
│   │   ├── hero-students.jpg     # Students studying
│   │   └── hero-campus.jpg       # Campus aerial view
│   ├── colleges/
│   │   ├── marwadi-university.jpg
│   │   ├── bangalore-tech.jpg
│   │   ├── akash-medical.jpg
│   │   ├── brindavan-group.jpg
│   │   ├── sridevi-medical.jpg
│   │   ├── sparsh-hospital.jpg
│   │   ├── sri-shankara.jpg
│   │   └── primus-bschool.jpg
│   ├── team/
│   │   ├── founder.jpg
│   │   ├── counselor-1.jpg
│   │   └── counselor-2.jpg
│   ├── testimonials/
│   │   ├── student-1.jpg
│   │   ├── student-2.jpg
│   │   └── student-3.jpg
│   ├── courses/
│   │   ├── engineering.jpg
│   │   ├── medical.jpg
│   │   ├── nursing.jpg
│   │   └── management.jpg
│   └── blog/
│       ├── kcet-guide.jpg
│       ├── neet-tips.jpg
│       └── scholarship.jpg
```

## Image Specifications

| Type | Size | Format | Max Size |
|------|------|--------|----------|
| Logo | 512x512 | PNG (transparent) | 100KB |
| Hero BG | 1920x1080 | JPG (compressed) | 300KB |
| College Photos | 800x600 | JPG | 200KB |
| Team Photos | 400x400 | JPG | 100KB |
| Testimonials | 200x200 | JPG | 50KB |
| Course Icons | 400x300 | JPG/PNG | 80KB |
| Blog Thumbnails | 600x400 | JPG | 150KB |

## Recommended Tools

- **Compress Images**: [tinypng.com](https://tinypng.com) or [squoosh.app](https://squoosh.app)
- **Remove Background**: [remove.bg](https://remove.bg)
- **Resize Images**: [picresize.com](https://picresize.com)
- **Create Favicon**: [favicon.io](https://favicon.io)

## Where to Get Images

1. **College Photos**: Contact colleges directly or use their official website
2. **Stock Photos**: 
   - [Unsplash](https://unsplash.com) (free)
   - [Pexels](https://pexels.com) (free)
   - [Pixabay](https://pixabay.com) (free)
3. **Team Photos**: Take professional headshots
4. **Logo**: Hire designer on Fiverr/99designs or use Canva

## Next.js Image Optimization

Since we're using static export, images are served as-is.
For dynamic sites, use Next.js Image component with optimization.
