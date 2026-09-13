import React from 'react';

const BLOBS = [
  { color: '#00d166', size: 420, top: -60, left: -80 },
  { color: '#006398', size: 380, top: 40, right: -100 },
  { color: '#005c55', size: 460, top: 420, left: 60 },
  { color: '#5eead4', size: 340, top: 520, right: 140 },
];

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="blob animate-blob"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            background: b.color,
            animationDelay: `${i * 4}s`,
          }}
        />
      ))}
    </div>
  );
};
