# Vidhyarthi Sewa - Career & Admission Consultancy Website

A premium, conversion-focused educational consultancy website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **8 Core Pages**: Home, About, Career Guidance, Colleges, Courses, Success Stories, Blog, Contact
- **Multi-Step Counseling Form**: 5-step lead generation form with validation
- **Career Assessment Quiz**: Interactive 10-question career path finder
- **Premium Animations**: Framer Motion scroll animations, hover effects, micro-interactions
- **Responsive Design**: Mobile-first with sticky navigation and bottom CTAs
- **SEO Optimized**: Meta tags, Open Graph, structured data, sitemap
- **Supabase Backend**: PostgreSQL database with Row Level Security
- **WhatsApp Integration**: Floating button with pre-filled messages
- **Callback Request**: Modal form for immediate counselor contact

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Cloudflare Pages
- **Analytics**: Google Analytics 4, Microsoft Clarity

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/vidhyarthisewa-website.git
cd vidhyarthisewa-website

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Update .env.local with your Supabase credentials
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build static export
npm run build

# The output will be in the `dist` folder
```

### Deploy to Cloudflare Pages

```bash
# Build for Cloudflare Pages
npm run pages:build

# Deploy
npx wrangler pages deploy .vercel/output/static --project-name=vidhyarthisewa-website
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration SQL in the SQL Editor:
   ```bash
   # File: supabase/migrations/001_initial.sql
   ```
3. Copy the project URL and anon key to `.env.local`
4. Enable Row Level Security (already configured in migrations)

## Project Structure

```
vidhyarthisewa-website/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout group
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── career-guidance/ # Career guidance page
│   │   ├── colleges/      # Colleges page
│   │   ├── courses/       # Courses page
│   │   ├── success-stories/ # Success stories page
│   │   ├── blog/          # Blog page
│   │   └── contact/       # Contact page
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   └── forms/             # Form components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── supabase.ts        # Supabase client
│   └── data.ts            # Static data
├── types/                 # TypeScript types
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |

## SEO Configuration

The site is optimized for the following keywords:
- Educational Consultant Bangalore
- Admission Consultant Bangalore
- Career Counseling Bangalore
- Engineering Admission Bangalore
- Medical Admission Bangalore
- Nursing Admission Bangalore
- KCET Counseling Bangalore
- College Admission Guidance Karnataka

## License

MIT License - Vidhyarthi Sewa Career & Admission Consultancy
