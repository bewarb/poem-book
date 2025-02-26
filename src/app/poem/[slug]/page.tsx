import { getPoemBySlug } from "@/lib/poems";
import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import type { Metadata } from "next";

export default async function PoemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  if (!poem) notFound();

  return <PoemDisplay title={poem.metadata.title} content={poem.content} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  return {
    title: poem?.metadata.title || "Poem Not Found",
    description: poem ? `A poem titled "${poem.metadata.title}".` : ""
  };
}