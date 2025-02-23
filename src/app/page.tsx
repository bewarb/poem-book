import Link from "next/link";
import { getAllPoems } from "@/lib/poems";
import ClientSideTypewriter from "@/components/ClientSideTypeWriter";

export default async function Home() {
  // Fetch poems on the server side
  const poems = await getAllPoems();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Title with Blinking Cursor */}
      <h1 className="text-4xl mb-2">
        <ClientSideTypewriter text="Poem Book" />
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg mb-6 opacity-80">By Botobop</h2>

      {/* Poem Titles */}
      <div className="space-y-4">
        {poems.map((poem, index) => (
          <Link 
            key={poem.slug} 
            href={`/poem/${poem.slug}`}
            className="block text-lg cursor-pointer hover:underline"
          >
            <ClientSideTypewriter 
              text={poem.metadata.title} 
              delay={500 * index} 
            />
          </Link>
        ))}
      </div>
    </main>
  );
}