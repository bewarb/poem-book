"use client";
import { Typewriter } from "react-simple-typewriter";

interface TypeWriterProps {
  words: string[];
  loop?: number;
  cursor?: boolean;
  cursorStyle?: string;
  delaySpeed?: number;
}

export function TypeWriter({ 
  words, 
  loop = 1, 
  cursor = false,
  cursorStyle = "_",
  delaySpeed = 0 
}: TypeWriterProps) {
  return (
    <Typewriter
      words={words}
      loop={loop}
      cursor={cursor}
      cursorStyle={cursorStyle}
      delaySpeed={delaySpeed}
    />
  );
}