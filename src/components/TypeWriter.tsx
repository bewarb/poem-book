"use client";
import { Typewriter } from "react-simple-typewriter";

interface TypeWriterProps {
  words: string[];
  loop?: number;
  cursor?: boolean;
  cursorStyle?: string;
  delaySpeed?: number;
  typeSpeed?: number;
}

export function TypeWriter({ 
  words, 
  loop = 1, 
  cursor = false,
  cursorStyle = "_",
  delaySpeed = 0,
  typeSpeed = 50
}: TypeWriterProps) {
  return (
    <Typewriter
      words={words}
      loop={loop}
      cursor={cursor}
      cursorStyle={cursorStyle}
      delaySpeed={delaySpeed}
      typeSpeed={typeSpeed}
    />
  );
}
