"use client";
import { TypeWriter } from "./TypeWriter";
import Link from "next/link";

export interface Poem {
  slug: string;
  metadata: {
    title: string;
    date: string;
  };
}

export default function PoemList({ poems }: { poems: Poem[] }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      {/* Title with Typewriter Effect */}
      <h1 className="text-4xl mb-2">
        <TypeWriter words={["Poem Book"]} loop={1} cursor cursorStyle="_" />
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg mb-6 opacity-80 text-center">By Botobop</h2>

      {/* Poem List */}
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
