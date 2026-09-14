import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPostsData } from "@/data/blogPosts";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL, SITE_NAME } from "@/config";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export async function generateStaticParams() {
  return blogPostsData
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { lang = "fr" } = await searchParams;
  const isEnglish = lang === "en";
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return {};

  const title = isEnglish ? post.titleEn : post.title;
  const description = isEnglish ? post.excerptEn : post.excerpt;
  const canonical = `${SITE_URL}/blog/${slug}`;
  const image = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  return {
    title,
    description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: image }],
      publishedTime: post.createdAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lang = "fr" } = await searchParams;
  const isEnglish = lang === "en";
  const post = blogPostsData.find((p) => p.slug === slug && p.published);

  if (!post) notFound();

  const title = isEnglish ? post.titleEn : post.title;
  const content = isEnglish ? post.contentEn : post.content;
  const canonical = `${SITE_URL}/blog/${slug}`;
  const image = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: isEnglish ? post.excerptEn : post.excerpt,
    image,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/hero-real.jpg` },
    },
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    keywords: post.keywords.join(", "),
  };

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl text-[#1C1C1C]" style={{ fontFamily: "var(--font-serif)" }}>
            {isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval"}
          </Link>
          <Link href={`/blog?lang=${lang}`} className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]">
            ← {isEnglish ? "Blog" : "Blog"}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero image */}
        <div className="aspect-[16/7] overflow-hidden mb-10">
          <img src={post.image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#8C7B6B] uppercase tracking-widest mb-6">
          <span>{isEnglish ? post.categoryEn : post.category}</span>
          <span>•</span>
          <span>{post.readTime} min</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl text-[#1C1C1C] mb-8 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>

        {/* Content — rendered as markdown-lite prose */}
        <article className="prose prose-stone max-w-none">
          {content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl text-[#1C1C1C] mt-10 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl text-[#1C1C1C] mt-8 mb-3 font-medium">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <li key={i} className="text-[#8C7B6B] leading-relaxed ml-4">
                  {line.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                </li>
              );
            }
            if (line.match(/^\d+\. /)) {
              return (
                <li key={i} className="text-[#8C7B6B] leading-relaxed ml-4 list-decimal">
                  {line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                </li>
              );
            }
            if (line.startsWith("> ")) {
              return (
                <blockquote key={i} className="border-l-4 border-[#8C7B6B] pl-4 my-4 italic text-[#8C7B6B]">
                  {line.replace("> ", "")}
                </blockquote>
              );
            }
            if (line.trim() === "" || line === "[...]") return <br key={i} />;
            return (
              <p key={i} className="text-[#8C7B6B] leading-relaxed mb-4">
                {line.replace(/\*\*(.*?)\*\*/g, "$1")}
              </p>
            );
          })}
        </article>

        {/* CTA */}
        <div className="mt-16 p-8 bg-[#1C1C1C] text-center">
          <p className="text-[#8C7B6B] text-xs tracking-widest uppercase mb-3">
            {isEnglish ? "Ready to experience it?" : "Prêt à vivre l'expérience ?"}
          </p>
          <h2 className="text-3xl text-[#FAF8F4] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            {isEnglish ? "Book your royal ride" : "Réservez votre balade royale"}
          </h2>
          <Link
            href={`/reservation?lang=${lang}`}
            className="inline-flex items-center bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors"
          >
            {isEnglish ? "Book now — from €490/person" : "Réserver — à partir de 490€/pers."}
          </Link>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
