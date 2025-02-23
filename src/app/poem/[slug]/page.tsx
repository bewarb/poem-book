import { getPoemBySlug } from "@/lib/poems";
import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import { Metadata } from "next";

// ✅ Use Next.js built-in type
interface PageProps {
  params: Record<string, string>;
}

export default async function PoemPage({ params }: PageProps) {
  if (!params || !params.slug) return notFound();

  const poem = await getPoemBySlug(params.slug);
  if (!poem) return notFound();

  return <PoemDisplay title={poem.metadata.title} content={poem.content} />;
}

// ✅ Optional: Define Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const poem = await getPoemBySlug(params.slug);

  if (!poem) {
    return { title: "Poem Not Found" };
  }

  return {
    title: poem.metadata.title,
    description: `A poem titled "${poem.metadata.title}".`,
  };
}
