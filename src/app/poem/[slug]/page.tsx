import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import { getPoemBySlug } from "@/lib/poems";
import type { Metadata } from "next";

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("📌 Fetching poem from markdown:", slug);

  const poem = getPoemBySlug(slug);

  if (!poem) {
    console.warn("⚠️ Poem not found:", slug);
    notFound();
  }

  return <PoemDisplay title={poem.metadata.title} content={poem.content} slug={slug} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  console.log("📌 Fetching metadata for slug:", slug);

  const poem = getPoemBySlug(slug);

  return {
    title: poem?.metadata.title || "Poem Not Found",
    description: poem ? `A poem titled "${poem.metadata.title}".` : "",
  };
}
