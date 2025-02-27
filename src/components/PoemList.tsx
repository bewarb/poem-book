"use client";
import { useEffect, useState } from "react";
import { TypeWriter } from "./TypeWriter";
import Link from "next/link";
import { motion } from "framer-motion"; // Import animation library

export interface Poem {
  slug: string;
  metadata: {
    title: string;
    date: string; // Format: YYYY-MM-DD
  };
}

export default function PoemList({ poems }: { poems: Poem[] }) {
  // Sort poems by date (newest first)
  const sortedPoems = [...poems].sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  const [titlePlayed, setTitlePlayed] = useState(false);
  const [visiblePoems, setVisiblePoems] = useState(0);

  useEffect(() => {
    // Check if title animation has played
    const hasPlayed = sessionStorage.getItem("titleAnimationPlayed");

    if (hasPlayed) {
      setTitlePlayed(true);
      setVisiblePoems(sortedPoems.length); // Show all poems instantly
    } else {
      sessionStorage.setItem("titleAnimationPlayed", "true");
      setTitlePlayed(false);
      setVisiblePoems(0); // Start animation fresh
    }
  }, [sortedPoems.length]); // ✅ Added dependency to avoid stale state issues

  useEffect(() => {
    if (visiblePoems < sortedPoems.length) {
      const timer = setTimeout(() => setVisiblePoems((prev) => prev + 1), 500); // Stagger animation
      return () => clearTimeout(timer);
    }
  }, [visiblePoems, sortedPoems.length]); // ✅ Ensured correct dependencies

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      {/* Title */}
      <h1 className="text-4xl mt-16">
        {titlePlayed ? (
          "to my devil" // ✅ Instantly render if animation has already played
        ) : (
          <TypeWriter
            words={["to my devil"]}
            loop={1}
            cursor
            cursorStyle="_"
            onComplete={() => setTitlePlayed(true)} // ✅ Save animation state
          />
        )}
      </h1>

      {/* Subtitle */}
      <h2 className="text-lg mb-10 opacity-80">By Aelita Nairb</h2>

      {/* Poem List with Animation */}
      <div className="space-y-6">
        {sortedPoems.slice(0, visiblePoems).map((poem, index) => (
          <motion.div
            key={poem.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }} // Staggered effect
          >
            <Link
              href={`/poem/${poem.slug}`}
              className="block text-lg cursor-pointer hover:underline"
            >
              <TypeWriter words={[poem.metadata.title]} loop={1} cursor={false} />
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
