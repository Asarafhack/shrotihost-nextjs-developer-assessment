"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Sparkles,
  User
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BLOG_POSTS, BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

export default function BlogArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Hosting Architecture",
    "Performance",
    "Infrastructure",
    "Commercial Transparency",
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="py-8 sm:py-12 flex flex-col gap-16 sm:gap-20">
      <Container>
        <Breadcrumbs items={[{ label: "Technical Blog & Guides" }]} />

        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="purple" size="sm" className="mb-3">
            Engineering Insights
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Architecture, Performance & Hosting Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            In-depth technical walkthroughs on LiteSpeed server optimization, CloudLinux resource governance, and transparent commercial hosting practices.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-slate-900/40 to-slate-900/60 shadow-lg hover:border-purple-500/60 transition-all"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="purple" size="sm">Featured Guide</Badge>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {featuredPost.readTimeMinutes} min read
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {featuredPost.publishedAt}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                {featuredPost.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200/40 dark:border-slate-800/60">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="h-3.5 w-3.5 text-purple-400" />
                  <span>By <strong>{featuredPost.author.name}</strong> ({featuredPost.author.role})</span>
                </div>
                <span className="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  Read full guide &rarr;
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-medium transition-colors",
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tags..."
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-purple-500/40 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.publishedAt} &bull; {post.author.name}</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <BookOpen className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">No articles matched your criteria</h4>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting &ldquo;All&rdquo; categories.</p>
            <Button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} variant="outline" size="sm" className="mt-4">
              Reset Filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
