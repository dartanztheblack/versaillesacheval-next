import type { Metadata } from "next";
import Link from "next/link";
import { blogPostsData } from "@/data/blogPosts";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL } from "@/config";

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

  return (
    <div className="min-h-screen bg-[#F3F0EB]">
      {/* Header */}
      <header className="bg-white border-b border-[#EAE4D9] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl text-[#1C1C1C]" style={{ fontFamily: "var(--font-serif)" }}>
            {isEnglish ? "Versailles Horse Riding" : "Versailles à Cheval"}
          </Link>
          <div className="flex items-center gap-4">
            <Link href={`?lang=${isEnglish ? "fr" : "en"}`} className="text-sm text-[#8C7B6B] hover:text-[#1C1C1C]">
              {isEnglish ? "FR" : "EN"}
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-[#8C7B6B] tracking-[0.2em] text-xs uppercase mb-4">
            {isEnglish ? "Our articles" : "Nos articles"}
          </p>
          <h1 className="text-4xl md:text-5xl text-[#1C1C1C]" style={{ fontFamily: "var(--font-serif)" }}>
            {isEnglish ? "Blog" : "Blog"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}?lang=${lang}`}
              className="group bg-white border border-[#EAE4D9] overflow-hidden hover:border-[#8C7B6B] transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={isEnglish ? post.titleEn : post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-[#8C7B6B] text-xs uppercase tracking-widest">
                  {isEnglish ? post.categoryEn : post.category}
                </span>
                <h2
                  className="text-xl text-[#1C1C1C] mt-2 mb-3 leading-tight group-hover:text-[#8C7B6B] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {isEnglish ? post.titleEn : post.title}
                </h2>
                <p className="text-[#8C7B6B] text-sm leading-relaxed line-clamp-3">
                  {isEnglish ? post.excerptEn : post.excerpt}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-[#8C7B6B]">
                  <span>{post.readTime} min</span>
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
