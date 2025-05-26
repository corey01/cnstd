import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './BrushRevealImage.module.css';

interface BrushRevealImageProps {
  image: string;
  strokes?: number;
  duration?: number;
  aspectRatio?: number; // e.g. 16/9, 4/3
}

const BrushRevealImage: React.FC<BrushRevealImageProps> = ({
  image,
  strokes = 6,
  duration = 3,
  aspectRatio = 4/3,
}) => {
  const maskId = useId();

  const [showFull, setShowFull] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  // const ref = useRef(null);

const containerRef = useRef<HTMLDivElement>(null);
const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

useEffect(() => {
  if (!containerRef.current) return;

  const el = containerRef.current;
  const updateSize = () => {
    const { width, height } = el.getBoundingClientRect();
    setSize({ width, height });
  };

  updateSize(); // initial

  const observer = new ResizeObserver(updateSize);
  observer.observe(el);

  return () => observer.disconnect();
}, []);

useEffect(() => {
  if (!isInView) return;

  const timeout = setTimeout(() => {
    setShowFull(true);
  }, duration * 1000);

  return () => clearTimeout(timeout);
}, [isInView, duration]);



  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setShowFull(true), duration * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, duration]);

  const brushElements = Array.from({ length: strokes }).map((_, i) => {
    const delay = (duration / strokes) * i;

    const bandHeight = size.height / strokes;
    const baseY = bandHeight * i;
    
    const w = size.width * 1.2;
    const h = bandHeight * 1.2;
    
    const edgeOffset = 20;
    const direction = i % 2 === 0 ? 1 : -1;
    
    // Flip behavior: both start near the same x, but flipped in place
    const x = direction === 1
      ? 0 + Math.random() * edgeOffset
      : size.width - (Math.random() * edgeOffset) - w;
    
    const y = baseY + (bandHeight - h) / 2 + Math.random() * (bandHeight - h) * 0.2;
    
    const rot = (Math.random() * 3 - 1.5);
    // const scale = 0.975 + Math.random() * 0.05;
    const scale = 1.25 + Math.random() * 0.05;
    
    return (
      <motion.g
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5, ease: 'easeOut' }}
        style={{
          transform: `translate(${x}px, ${y}px) scaleX(${direction}) rotate(${rot}deg) scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        <image
          href="/images/stroke.png"
          width={w}
          height={h}
          x={0}
          y={0}
        />
      </motion.g>
    
    );
  });

  return (
<div
  className={styles.wrapper}
  ref={containerRef}
  style={{ aspectRatio: `${aspectRatio}` }}
>

      {size.width > 0 && size.height > 0 && (
        <svg
  viewBox={`0 0 ${size.width} ${size.height}`}
  width="100%"
  height="100%"
>
  <defs>
    <mask id={maskId}>
      <rect width="100%" height="100%" fill="black" />
      {brushElements}
    </mask>
  </defs>

  {/* Masked image */}
  <image
    href={image}
    width="100%"
    height="100%"
    mask={`url(#${maskId})`}
  />

  {/* Final image overlay inside same SVG, same space */}
  {showFull && (
    <motion.image
      href={image}
      width="100%"
      height="100%"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )}
</svg>

      )}

    </div>
  );
};

export default BrushRevealImage;
