import React from 'react';

/**
 * Wraps emoji so they keep their real colors under Dark/Night mode's invert+hue-rotate
 * filter (see .theme-inverted .emoji-fix in index.css) — without this, emoji render
 * with inverted, off-color hues since they're text glyphs, not <img> elements that can
 * otherwise be corrected the same way.
 */
export const Emoji: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span className={`emoji-fix${className ? ` ${className}` : ''}`}>{children}</span>
);
