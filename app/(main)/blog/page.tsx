"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, Clock, ArrowRight, Search, Tag, Calendar,
  User, TrendingUp, GraduationCap, FileText, Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/data";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 gradient-bg overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Blog & Resources
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Expert Insights & Guides
            </h1>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              Stay updated with the latest admission news, career tips, and educational insights.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 backdrop-blur-lg border-white/20 text-white placeholder:text-white/50 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && activeCategory === "All" && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-500 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.published_at}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.read_time}
                    </span>
                  </div>
                  <Link 
                    href={`/blog/`}
                    className="inline-flex items-center gap-2 text-amber-600 font-medium hover:gap-3 transition-all"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center p-12">
                  <FileText className="w-32 h-32 text-slate-200" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/images/blog/${post.slug}.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                    }}
                  />
                  <FileText className="w-16 h-16 text-slate-300 fallback-icon hidden" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </div>
                    <Link 
                      href={`/blog/`}
                      className="text-amber-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-400">No articles found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
