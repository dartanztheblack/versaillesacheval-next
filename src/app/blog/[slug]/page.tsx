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
    <div style={{ minHeight: "100vh", background: "#FAFAF8" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(44,62,45,0.1)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href={`/?lang=${lang}`}
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.1rem", color: "#1A1A1A", letterSpacing: "0.03em" }}
          >
            Versailles à Cheval
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href={`/blog?lang=${lang}`}
            style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6B5F" }}
          >
            ← Journal
          </Link>
          <Link
            href={`/blog?lang=${isEnglish ? "fr" : "en"}`}
            style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#6B6B5F" }}
          >
            {isEnglish ? "FR" : "EN"}
          </Link>
          </div>
        </div>
      </nav>

      {/* Hero image — full width */}
      <div style={{ width: "100%", aspectRatio: "21/7", overflow: "hidden", position: "relative" }}>
        <img
          src={post.image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(26,26,26,0.6) 100%)" }} />
      </div>

      {/* Article header */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 40px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B7355" }}>
            {isEnglish ? post.categoryEn : post.category}
          </span>
          <span style={{ color: "rgba(44,62,45,0.2)", fontSize: "12px" }}>·</span>
          <span style={{ fontSize: "11px", color: "#6B6B5F" }}>
            {post.readTime} min
          </span>
          <span style={{ color: "rgba(44,62,45,0.2)", fontSize: "12px" }}>·</span>
          <span style={{ fontSize: "11px", color: "#6B6B5F" }}>
            {new Date(post.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "24px" }}>
          {title}
        </h1>

        <p style={{ fontSize: "1.1rem", color: "#6B6B5F", lineHeight: 1.8, marginBottom: "0", borderBottom: "1px solid rgba(44,62,45,0.1)", paddingBottom: "48px" }}>
          {isEnglish ? post.excerptEn : post.excerpt}
        </p>
      </div>

      {/* Article content */}
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 40px 0" }}>
        <div style={{ fontSize: "1rem", lineHeight: 1.9, color: "#2E2E2E" }}>
          {content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#1A1A1A", marginTop: "64px", marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "#1A1A1A", marginTop: "40px", marginBottom: "12px", letterSpacing: "0.03em", textTransform: "uppercase", fontSize: "0.85rem" }}
                >
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ") || line.startsWith("* ")) {
              return (
                <li
                  key={i}
                  style={{ color: "#4A4A42", lineHeight: 1.8, marginLeft: "20px", marginBottom: "8px" }}
                >
                  {line.replace(/^[-*] /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                </li>
              );
            }
            if (line.match(/^\d+\. /)) {
              return (
                <li
                  key={i}
                  style={{ color: "#4A4A42", lineHeight: 1.8, marginLeft: "20px", marginBottom: "8px", listStyleType: "decimal" }}
                >
                  {line.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                </li>
              );
            }
            if (line.startsWith("> ")) {
              return (
                <blockquote
                  key={i}
                  style={{ borderLeft: "2px solid #8B7355", paddingLeft: "24px", margin: "32px 0", fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.2rem", color: "#6B6B5F", fontStyle: "italic", lineHeight: 1.6 }}
                >
                  {line.replace("> ", "")}
                </blockquote>
              );
            }
            if (line.trim() === "" || line === "[...]") return <div key={i} style={{ height: "16px" }} />;
            return (
              <p
                key={i}
                style={{ color: "#4A4A42", lineHeight: 1.9, marginBottom: "20px" }}
              >
                {line.replace(/\*\*(.*?)\*\*/g, "$1")}
              </p>
            );
          })}
        </div>

        {/* CTA band */}
        <div style={{ marginTop: "80px", marginBottom: "0", padding: "64px 56px", background: "#2C3E2D", textAlign: "center" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            {isEnglish ? "Ready to experience it?" : "Prêt à vivre l'expérience ?"}
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FAFAF8", marginBottom: "32px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            {isEnglish ? "Book your royal ride" : "Réservez votre balade royale"}
          </h2>
          <Link
            href={`/reservation?lang=${lang}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#FAFAF8", color: "#1A1A1A", padding: "16px 40px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}
          >
            {isEnglish ? "Book now — from €490/person" : "Réserver — à partir de 490€/pers."}
            <span>→</span>
          </Link>
        </div>
      </main>

      <div style={{ height: "80px" }} />
      <Footer lang={lang} />
    </div>
  );
}
