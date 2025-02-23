import { getPoemBySlug } from "@/lib/poems";
import { notFound } from "next/navigation";
import PoemDisplay from "@/components/PoemDisplay";

export default async function PoemPage({ params }: { params: { slug: string } }) {
  if (!params || !params.slug) {
    return notFound();
  }

  const poem = await getPoemBySlug(params.slug);

  if (!poem) return notFound();

  return <PoemDisplay title={poem.metadata.title} content={poem.content} />;
}
