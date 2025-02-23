"use client";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useState } from "react";

interface Poem {
  slug: string;
  metadata: {
    title: string;
    date: string;
  };
}

export default function PoemListClient({ poems }: { poems: Poem[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl mb-2">
        <Typewriter words={["Poem Book"]} loop={1} cursor cursorStyle="_" />
      </h1>
      <h2 className="text-lg mb-6 opacity-80">By Botobop</h2>
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