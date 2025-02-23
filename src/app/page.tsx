"use client";
import Link from "next/link";
import { getAllPoems } from "@/lib/poems";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";

interface Poem {
  slug: string;
  metadata: {
    title: string;
    date: string;
  };
}

// Server Component
async function PoemList() {
  const poems = await getAllPoems();
  return <PoemListClient poems={poems} />;
}

// Client Component
function PoemListClient({ poems }: { poems: Poem[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Title with Blinking Cursor */}
      <h1 className="text-4xl mb-2">
        <Typewriter 
          words={["Poem Book"]} 
          loop={1} 
          cursor 
          cursorStyle="_" 
        />
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
            <Typewriter
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

export default function Home() {
  return <PoemList />;
}