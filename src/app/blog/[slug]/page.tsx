import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Share2,
  Tag,
  BookOpen
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found | Shroti Host" };
  }
  return {
    title: `${post.title} | Shroti Host Engineering Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedSlugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <article className="py-8 sm:py-12">
      <Container size="narrow">
        <Breadcrumbs
          items={[
            { label: "Technical Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Badge variant="purple" size="sm">{post.category}</Badge>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.publishedAt}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center font-bold">
                {post.author.name[0]}
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100 block">{post.author.name}</span>
                <span className="text-slate-500">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <span className="text-[11px] font-mono">Shroti Host Platform Insights</span>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box */}
        {post.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/60 dark:bg-purple-950/20 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">&bull;</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Body Prose */}
        <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-slate-400 mr-1" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Guides Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-4">
              Related Infrastructure Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-purple-500/40 transition-colors"
                >
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 mt-2 block">
                    {rel.readTimeMinutes} min read &bull; Read &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Return Button */}
        <div className="mt-12 text-center">
          <Button href="/blog" variant="outline" size="sm">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            <span>Back to All Technical Guides</span>
          </Button>
        </div>
      </Container>
    </article>
  );
}
