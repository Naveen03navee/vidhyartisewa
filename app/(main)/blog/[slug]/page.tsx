import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data";

// 1. Tell Next.js which blog pages to build for Cloudflare
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// 2. The actual Blog Post Page layout
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container-custom max-w-4xl">
        
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-slate-500 hover:text-amber-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-10">
          <Badge className="mb-6 bg-amber-50 text-amber-700 hover:bg-amber-100 border-none px-3 py-1">
            {post.category}
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-slate-700">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.published_at}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.read_time}
            </div>
          </div>
        </header>

        {/* Featured Image (Cleaned up for Server Component compatibility) */}
        <div className="w-full h-[400px] md:h-[500px] rounded-3xl bg-slate-100 mb-12 overflow-hidden relative border border-slate-100 flex items-center justify-center">
          <img 
            src={`/images/blog/${post.slug}.jpg`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
            {post.excerpt}
          </p>
          
          <div className="text-slate-600 leading-relaxed space-y-6">
            <p>
              Welcome to the full article for <strong>{post.title}</strong>. 
              {post.content && post.content !== "Full content here..." ? post.content : " We are currently updating our educational resources. The full, detailed guide for this topic will be published here shortly. Please check back soon!"}
            </p>
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="text-sm font-bold text-slate-900 mr-2 flex items-center">Tags:</span>
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}