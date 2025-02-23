"use client";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

export default function PoemDisplay({ title, content }: { title: string; content: string }) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const delay = 1000 + lines[currentLineIndex].length * 50;
      const timer = setTimeout(() => setCurrentLineIndex(currentLineIndex + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines.length]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* ✅ Title with Blinking Cursor */}
      <h1 className="text-3xl mb-4">
        <Typewriter words={[title]} loop={1} cursor cursorStyle="_" />
      </h1>

      {/* ✅ Poem Lines WITHOUT Blinking Cursor */}
      <div className="text-lg max-w-2xl">
        {lines.slice(0, currentLineIndex + 1).map((line, index) => (
          <p key={index} className="mb-2">
            <Typewriter
              words={[line]}
              loop={1}
              typeSpeed={50}
              delaySpeed={0}
              cursor={false} // 🚀 Remove Blinking Cursor for Poem Lines
            />
          </p>
        ))}
      </div>
    </main>
  );
}
