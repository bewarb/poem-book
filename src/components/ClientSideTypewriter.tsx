"use client";
import { Typewriter } from "react-simple-typewriter";

interface ClientSideTypewriterProps {
  text: string;
  delay?: number;
  showCursor?: boolean;
}

export default function ClientSideTypewriter({ 
  text, 
  delay = 0,
  showCursor = false 
}: ClientSideTypewriterProps) {
  return (
    <Typewriter
      words={[text]}
      loop={1}
      delaySpeed={delay}
      cursor={showCursor}
      cursorStyle="_"
    />
  );
}