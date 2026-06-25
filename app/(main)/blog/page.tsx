"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, Clock, ArrowRight, Search, Calendar,
  User, FileText, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES } from "@/lib/data"; // Only keeping categories from dummy data
import { BlogHero } from "@/components/sections/blog-hero";
import { createClient } from "@/lib/supabase-client"; 

const SUPABASE_IMAGE_URL = "https://tauhscbkagspofmfbqlx.supabase.co/storage/v1/object/public/website-images";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for live database blogs
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live blogs from Supabase
  useEffect(() => {
    async function fetchLiveBlogs() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false }); // Newest first
      
      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }
      setIsLoading(false);
    }
    
    fetchLiveBlogs();
  }, []);

  // Filters the live 'blogs' array
  const filteredPosts = blogs.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = 
      (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0]; // The newest post becomes the featured one
  const isSearching = searchQuery.length > 0;

  // Helper to format the Supabase timestamp into a readable date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Hybrid image source for the featured post
  const featuredImageSource = featuredPost ? (featuredPost.image_url || `${SUPABASE_IMAGE_URL}/blogs/${featuredPost.slug}.jpg`) : '';

  return (
    <div className="pt-20">
      
      {/* 1. HERO COMPONENT */}
      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* LOADING STATE */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 min-h-[400px]">
          <Loader2 className="w-12 h-12 text-[#FF6138] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Loading latest articles...</p>
        </div>
      ) : (
        <>
          {/* 2. Featured Post - HIDES WHEN SEARCHING */}
          {!isSearching && activeCategory === "All" && featuredPost && (
            <section className="py-16 bg-white">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-shadow"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge className="w-fit mb-6 bg-amber-100 text-amber-700 hover:bg-amber-200 text-sm px-3 py-1">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 leading-tight hover:text-[#FF6138] transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-600 mb-8 text-lg leading-relaxed line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="w-3 h-3 text-slate-500" />
                          </div>
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {formatDate(featuredPost.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                          <Clock className="w-4 h-4" />
                          {/* Pulls read_time from DB with a fallback */}
                          {featuredPost.read_time || "3 min read"}
                        </span>
                      </div>
                      
                      <Link 
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-[#FF6138] hover:bg-[#E5502B] text-white px-6 py-3 rounded-xl font-bold transition-all w-fit shadow-md hover:scale-105"
                      >
                        Read Full Article
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>

                    <div className="relative bg-slate-100 flex items-center justify-center overflow-hidden min-h-[300px] lg:min-h-full group">
                      <img 
                        src={featuredImageSource}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                      <FileText className="w-24 h-24 text-slate-300 fallback-icon hidden relative z-10" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* 3. Category Filter - HIDES WHEN SEARCHING */}
          {!isSearching && (
            <section className="py-4 bg-white border-b border-slate-100 sticky top-16 z-30 shadow-sm transition-all">
              <div className="container-custom">
                <div className="flex justify-center overflow-x-auto w-full pb-2 lg:pb-0 hide-scrollbar">
                  <div className="flex gap-2">
                    {BLOG_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          const grid = document.getElementById("blog-grid");
                          if (grid) {
                            const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                          activeCategory === cat
                            ? "bg-[#FF6138] text-white shadow-lg shadow-[#FF6138]/30"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 4. Blog Grid */}
          <section id="blog-grid" className="py-16 bg-slate-50 min-h-[600px]">
            <div className="container-custom">
              
              {isSearching && (
                <div className="mb-8 text-slate-600 font-medium">
                  Showing results for <span className="font-bold text-slate-900">"{searchQuery}"</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(!isSearching && activeCategory === "All" ? 1 : 0).map((post, index) => {
                  
                  const imageSource = post.image_url || `${SUPABASE_IMAGE_URL}/blogs/${post.slug}.jpg`;

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 flex flex-col group"
                    >
                      <div className="h-56 bg-slate-100 relative overflow-hidden">
                        <img 
                          src={imageSource}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                          }}
                        />
                        <FileText className="w-16 h-16 text-slate-300 fallback-icon hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-900 font-bold px-3 py-1 shadow-sm">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1 text-[#FF6138]">
                            <Clock className="w-3.5 h-3.5" />
                            {/* Pulls read_time from DB with a fallback */}
                            {post.read_time || "3 min read"}
                          </span>
                          <span>•</span>
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#FF6138] transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                              <User className="w-3 h-3 text-slate-500" />
                            </div>
                            {post.author}
                          </div>
                          
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="text-[#FF6138] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100"
                          >
                            Read
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-32">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-500 text-lg">We could not find anything matching "{searchQuery}". Try a different keyword or category.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      
    </div>
  );
}