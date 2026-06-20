# 🖼️ How to Add Images to Vidhyarthi Sewa Website

## Step-by-Step Guide

### Step 1: Create Your Images Folder

After extracting the zip, create this folder structure inside `public/`:

```
public/
└── images/
    ├── logo/
    ├── hero/
    ├── colleges/
    ├── team/
    ├── testimonials/
    ├── courses/
    └── blog/
```

### Step 2: Add Your Logo

**Option A: Use your existing logo**
1. Save your logo as `logo.png` (transparent background)
2. Save a white version as `logo-white.png`
3. Copy both to: `public/images/logo/`

**Option B: Create a simple text logo**
If you don't have a logo, the website already shows "Vidhyarthi Sewa" text with a graduation cap icon. You can keep this.

### Step 3: Add College Photos

For each partner college, add a photo:

| College | File Name | Where to Get |
|---------|-----------|--------------|
| Marwadi University | `marwadi-university.jpg` | College website or Google Images |
| Bangalore Tech Institute | `bangalore-tech.jpg` | College website |
| Akash Medical College | `akash-medical.jpg` | College website |
| Brindavan Group | `brindavan-group.jpg` | College website |
| Sridevi Medical College | `sridevi-medical.jpg` | College website |
| Sparsh Hospital | `sparsh-hospital.jpg` | College website |
| Sri Shankara Cancer Hospital | `sri-shankara.jpg` | College website |
| Primus B School | `primus-bschool.jpg` | College website |

**Copy to:** `public/images/colleges/`

### Step 4: Add Team Photos

1. Take professional headshots of your team members
2. Name them: `1.jpg`, `2.jpg`, `3.jpg`, etc. (matching the order in data.ts)
3. **Copy to:** `public/images/team/`

### Step 5: Add Hero Background (Optional)

1. Find a high-quality education/campus image
2. Save as `hero-bg.jpg`
3. **Copy to:** `public/images/hero/`
4. Uncomment the background image code in `components/sections/hero-section.tsx`

### Step 6: Compress Images

Before adding, compress images to keep website fast:

**Online Tools (Free):**
- [TinyPNG](https://tinypng.com) — Compress JPG/PNG
- [Squoosh](https://squoosh.app) — Advanced compression
- [Image Resizer](https://picresize.com) — Resize images

**Recommended sizes:**
| Type | Max Width | Max File Size |
|------|-----------|---------------|
| Logo | 512px | 100KB |
| College Photos | 800px | 200KB |
| Team Photos | 400px | 100KB |
| Hero BG | 1920px | 300KB |

### Step 7: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and check:
- Logo appears in navigation
- College photos show on `/colleges/`
- Team photos show on `/about/`

### Step 8: Build & Deploy

```bash
npm run build
npm run pages:build
npx wrangler pages deploy out
```

## 🎨 Quick Logo Creation (No Designer Needed)

### Option 1: Canva (Free)
1. Go to [canva.com](https://canva.com)
2. Search "education logo" templates
3. Customize with "Vidhyarthi Sewa" text
4. Download as PNG with transparent background

### Option 2: Text Logo (Simplest)
The website already has a beautiful text-based logo with a graduation cap icon. You can:
- Keep it as-is (professional look)
- Or add a simple colored square behind the icon

### Option 3: Hire on Fiverr
- Search "logo design" on [fiverr.com](https://fiverr.com)
- Budget: $5-$50 for a professional logo

## 📸 Where to Get College Photos

### Method 1: Official Sources (Best Quality)
1. Visit each college's official website
2. Go to "Gallery" or "Campus" section
3. Download high-quality images
4. Email the college for permission if needed

### Method 2: Google Images
1. Search: `"College Name" campus`
2. Click "Tools" → "Size" → "Large"
3. Right-click → "Save image as"
4. **Important:** Only use if you have permission

### Method 3: Stock Photos (Safe)
- [Unsplash](https://unsplash.com) — Search "university campus", "medical college"
- [Pexels](https://pexels.com) — Free education photos
- [Pixabay](https://pixabay.com) — Free for commercial use

## ⚡ Pro Tips

1. **Always compress images** before adding — keeps site fast
2. **Use consistent aspect ratios** — all college photos same size looks professional
3. **Add alt text** — already included in code for accessibility
4. **Test on mobile** — images should look good on small screens
5. **Backup originals** — keep uncompressed versions in a separate folder

## 🆘 If Images Don't Show

1. Check file is in correct folder: `public/images/colleges/`
2. Check filename matches exactly (case-sensitive): `marwadi-university.jpg`
3. Check file extension: `.jpg` not `.jpeg` or `.JPG`
4. Restart dev server: `Ctrl+C` then `npm run dev`
5. Clear browser cache: `Ctrl+Shift+R`

## 📝 Example: Adding One College Photo

```bash
# 1. Download photo from college website
# 2. Compress it using tinypng.com
# 3. Rename to exact slug from data.ts
mv downloaded-photo.jpg marwadi-university.jpg

# 4. Copy to correct folder
cp marwadi-university.jpg public/images/colleges/

# 5. Run dev server
npm run dev

# 6. Check at http://localhost:3000/colleges/
```
