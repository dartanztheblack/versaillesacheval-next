import type { Metadata } from "next";
import Link from "next/link";
import { blogPostsData } from "@/data/blogPosts";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL } from "@/config";

const hoverStyles = `
  .blog-card-img { transition: transform 0.6s ease; }
  .blog-card:hover .blog-card-img { transform: scale(1.05); }
  .blog-featured-img { transition: transform 0.8s ease; }
  .blog-featured:hover .blog-featured-img { transform: scale(1.04); }
`;

export const metadata: Metadata = {
  title: "Blog – Versailles à Cheval | Guides & Conseils Équestres",
  description:
    "Découvrez nos guides sur les balades à cheval à Versailles : conseils, tarifs, itinéraires, événements et expériences royales. Tout pour préparer votre visite.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { lang = "fr" } = await searchParams;
  const isEnglish = lang === "en";
  const posts = blogPostsData.filter((p) => p.published);
  const [featured, ...rest] = posts;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8" }}>
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid rgba(44,62,45,0.1)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href={`/?lang=${lang}`}
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.1rem", color: "#1A1A1A", letterSpacing: "0.03em" }}
          >
            Versailles à Cheval
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <Link
              href={`/reservation?lang=${lang}`}
              style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6B5F" }}
            >
              {isEnglish ? "Book" : "Réserver"}
            </Link>
            <Link
              href={`?lang=${isEnglish ? "fr" : "en"}`}
              style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#6B6B5F" }}
            >
              {isEnglish ? "FR" : "EN"}
            </Link>
          </div>
        </div>
      </nav>

      {/* Journal header */}
      <div style={{ textAlign: "center", padding: "80px 32px 64px" }}>
        <p style={{ color: "#2C3E2D", letterSpacing: "0.35em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "16px" }}>
          {isEnglish ? "Our articles" : "Nos articles"}
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#1A1A1A", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "0" }}>
          {isEnglish ? "Journal" : "Journal"}
        </h1>
        <div style={{ width: "40px", height: "1px", background: "rgba(44,62,45,0.3)", margin: "24px auto 0" }} />
      </div>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px 120px" }}>

        {/* Featured article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}?lang=${lang}`}
            className="blog-featured"
            style={{ display: "block", marginBottom: "80px" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", border: "1px solid rgba(44,62,45,0.1)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                <img
                  src={featured.image}
                  alt={isEnglish ? featured.titleEn : featured.title}
                  className="blog-featured-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ background: "#F4F2EE", padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#8B7355", marginBottom: "24px", display: "block" }}>
                  {isEnglish ? featured.categoryEn : featured.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", color: "#1A1A1A", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "20px" }}>
                  {isEnglish ? featured.titleEn : featured.title}
                </h2>
                <p style={{ color: "#6B6B5F", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "40px" }}>
                  {isEnglish ? featured.excerptEn : featured.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#6B6B5F", letterSpacing: "0.1em" }}>
                    {new Date(featured.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { year: "numeric", month: "long" })}
                    {" · "}
                    {featured.readTime} min
                  </span>
                  <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#2C3E2D" }}>
                    {isEnglish ? "Read →" : "Lire →"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Divider label */}
        {rest.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "48px" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(44,62,45,0.1)" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6B6B5F", whiteSpace: "nowrap" }}>
              {isEnglish ? "All articles" : "Tous les articles"}
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(44,62,45,0.1)" }} />
          </div>
        )}

        {/* Article grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {rest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}?lang=${lang}`}
              className="blog-card"
              style={{ display: "block", background: "#fff", overflow: "hidden", border: "1px solid rgba(44,62,45,0.08)" }}
            >
              <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={isEnglish ? post.titleEn : post.title}
                  className="blog-card-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B7355", display: "block", marginBottom: "12px" }}>
                  {isEnglish ? post.categoryEn : post.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.2rem", color: "#1A1A1A", lineHeight: 1.35, letterSpacing: "-0.01em", marginBottom: "12px" }}>
                  {isEnglish ? post.titleEn : post.title}
                </h2>
                <p style={{ fontSize: "13px", color: "#6B6B5F", lineHeight: 1.7, marginBottom: "20px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {isEnglish ? post.excerptEn : post.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", color: "rgba(107,107,95,0.7)", borderTop: "1px solid rgba(44,62,45,0.08)", paddingTop: "16px" }}>
                  <span>{post.readTime} min</span>
                  <span style={{ color: "rgba(44,62,45,0.2)" }}>·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString(isEnglish ? "en-US" : "fr-FR", { year: "numeric", month: "long" })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      <Footer lang={lang} />
    </div>
  );
}
