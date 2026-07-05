import React from 'react';

export function InteractiveHoverText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`group inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0 transition-opacity duration-300 group-hover:opacity-30 hover:!opacity-100"
        >
          {word}
        </span>
      ))}
    </span>
  );
}
