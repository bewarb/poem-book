"use client";
import { useState, useEffect } from "react";
import { TypeWriter } from "./TypeWriter"; 

export default function PoemDisplay({ title, content }: { title: string; content: string }) {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const delay = 1000 + lines[currentLineIndex].length * 50;
      const timer = setTimeout(() => setCurrentLineIndex(currentLineIndex + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, lines]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-3xl mb-4">
        <TypeWriter words={[title]} loop={1} cursor cursorStyle="_" />
      </h1>
      <div className="text-lg max-w-2xl">
        {lines.slice(0, currentLineIndex + 1).map((line, index) => (
          <p key={index} className="mb-2">
            <TypeWriter words={[line]} loop={1} typeSpeed={50} cursor={false} />
          </p>
        ))}
      </div>
    </main>
  );
}
