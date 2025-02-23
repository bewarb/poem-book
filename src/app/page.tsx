import Link from "next/link";
import { getAllPoems } from "@/lib/poems";
import { TypeWriter } from "@/components/TypeWriter";

export default async function Home() {
  const poems = await getAllPoems();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Title with Blinking Cursor */}
      <h1 className="text-4xl mb-2">
        <TypeWriter words={["Poem Book"]} loop={1} cursor cursorStyle="_" />
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
            <TypeWriter 
              words={[poem.metadata.title]} 
              loop={1} 
              delaySpeed={500 * index} 
              cursor={false}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}