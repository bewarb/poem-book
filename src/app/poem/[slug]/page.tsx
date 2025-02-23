import { getPoemBySlug } from "@/lib/poems";
import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import type { Metadata } from "next";

// Corrected Props type
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PoemPage({ params }: Props) {
  // No need to await params - they come as plain object
  const { slug } = params;
  if (!slug) return notFound();
  
  const poem = await getPoemBySlug(slug);
  if (!poem) return notFound();
  
  return (
    <PoemDisplay 
      title={poem.metadata.title} 
      content={poem.content} 
    />
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Directly destructure params without await
  const { slug } = params;
  const poem = await getPoemBySlug(slug);
  
  return poem ? {
    title: poem.metadata.title,
    description: `A poem titled "${poem.metadata.title}".`,
  } : {
    title: "Poem Not Found"
  };
}