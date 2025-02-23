import { getPoemBySlug } from "@/lib/poems";
import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PoemPage({ params }: Props) {
  const { slug } = await params;
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
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  
  if (!poem) {
    return { 
      title: "Poem Not Found" 
    };
  }
  
  return {
    title: poem.metadata.title,
    description: `A poem titled "${poem.metadata.title}".`,
  };
}