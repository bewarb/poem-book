"use client";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

interface PoemListClientProps {
  initialPoems: {
    slug: string;
    metadata: {
      title: string;
      date: string;
    };
  }[];
}

export default function PoemListClient({ initialPoems }: PoemListClientProps) {
  return (
    <>
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
        {initialPoems.map((poem, index) => (
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
    </>
  );
}