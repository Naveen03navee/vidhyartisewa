import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Facebook, Twitter, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/data";

// Import the safe client-side image fallback component
import { BlogFeaturedImage } from "@/components/ui/blog-image";

// 1. ADD SUPABASE BASE URL
const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

// Generates all static paths at build time for the 'output: export' configuration
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Find the current article matching the URL slug
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  // Trigger Next.js 404 page if slug doesn't exist
  if (!post) {
    notFound();
  }

  // 2. CONSTRUCT THE HYBRID IMAGE SOURCE
  const imageSource = (post as any).image_url || `${SUPABASE_IMAGE_URL}/blogs/${post.slug}.jpg`;

  return (
    <div className="pt-20 pb-20 bg-slate-50 min-h-screen">
      
      {/* 1. Article Hero Header */}
      <section className="relative pt-16 pb-32 bg-slate-900 overflow-hidden">
        {/* Ambient background accent glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6138]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>

            <div className="mb-6">
              <Badge className="bg-[#FF6138] text-white border-none px-3 py-1 text-sm shadow-lg shadow-[#FF6138]/30">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-8 tracking-tight leading-[1.2]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.published_at}
              </span>
              <span className="flex items-center gap-2 text-amber-400">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Article Content Body */}
      <section className="relative -mt-20 z-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-6 sm:p-8 lg:p-14">
            
            {/* 3. Featured Photo Section (Updated to use Supabase source) */}
            <BlogFeaturedImage src={imageSource} alt={post.title} />

            {/* Lead Excerpt */}
            <p className="text-xl lg:text-2xl text-slate-600 font-medium leading-relaxed mb-10 pb-10 border-b border-slate-100 italic">
              "{post.excerpt}"
            </p>

            {/* Main Content */}
            <div 
              className="prose prose-lg prose-slate max-w-none text-slate-700 leading-loose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags & Social Sharing Panels */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Share:</span>
                <Button size="icon" variant="outline" className="rounded-full w-10 h-10 text-blue-600 hover:bg-blue-50 hover:text-blue-700 border-slate-200">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full w-10 h-10 text-sky-500 hover:bg-sky-50 hover:text-sky-600 border-slate-200">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full w-10 h-10 text-blue-700 hover:bg-blue-50 hover:text-blue-800 border-slate-200">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Global Call to Action Banner */}
      <section className="mt-20">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-amber-500 to-[#FF6138] rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">Need personalized guidance?</h3>
              <p className="text-white/90 mb-8 text-lg">
                Stop reading and start acting. Let our experts create a custom admission roadmap just for you.
              </p>
              <Link href="/#counseling-form">
                <Button size="lg" className="bg-white text-[#FF6138] hover:bg-slate-50 font-bold px-8 rounded-full h-14 shadow-lg hover:scale-105 transition-transform">
                  Book Your Free Strategy Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}