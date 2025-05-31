import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BrushRevealImage.module.css";

interface BrushRevealImageProps {
  image: string;
  strokes?: number;
  duration?: number;
  aspectRatio?: number;
}

const BrushRevealImage: React.FC<BrushRevealImageProps> = ({
  image,
  strokes = 6,
  duration = 3,
  aspectRatio = 4 / 3,
}) => {
  const instanceId = useId(); // unique per component
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  const [showFull, setShowFull] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Resize tracking
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      setSize({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger final image fade-in after brush strokes
  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setShowFull(true), duration * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, duration]);

  // Random stroke layout — memoized per component instance
  const randomBrushData = useMemo(() => {
    if (!size.width || !size.height) return [];

    return Array.from({ length: strokes }).map((_, i) => {
      const bandHeight = size.height / strokes;
      const baseY = bandHeight * i;

      const w = size.width * 1.2;
      const h = bandHeight * 1.2;

      const y =
        baseY + (bandHeight - h) / 2 + Math.random() * (bandHeight - h) * 0.2;
      const x = Math.random() * (size.width - w);

      const direction = i % 2 === 0 ? 1 : -1;
      const rot = Math.random() * 3 - 1.5;
      const scale = 0.975 + Math.random() * 0.05;
      const delay = (duration / strokes) * i;

      return { i, x, y, w, h, direction, rot, scale, delay };
    });
  }, [size.width, size.height, strokes, duration]);

  const brushElements = isInView
    ? randomBrushData.map(({ i, x, y, w, h, direction, rot, scale, delay }) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay, duration: 0.5 }}
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <mask id={`stroke-mask-${instanceId}-${i}`}>
            <motion.rect
              initial={
                direction === 1 ? { width: 0, x: 0 } : { width: 0, x: w }
              }
              animate={{ width: w, x: 0 }}
              transition={{ delay, duration: 0.5, ease: "easeOut" }}
              height={h}
              fill="white"
            />
          </mask>

          {/* <image
            href="/images/stroke.png"
            width={w}
            height={h}
            x={0}
            y={0}
            mask={`url(#stroke-mask-${instanceId}-${i})`}
            style={{ filter: 'brightness(10000%)' }}
          /> */}
        </motion.g>
      ))
    : [];

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
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id={`stroke-mask-${instanceId}-final`}>
              <rect width="100%" height="100%" fill="black" />
              {randomBrushData.map(({ i, w, h, direction, delay }) => (
                <motion.rect
                  key={i}
                  initial={
                    direction === 1 ? { width: 0, x: 0 } : { width: 0, x: w }
                  }
                  animate={{ width: w, x: 0 }}
                  transition={{ delay, duration: 0.5, ease: "easeOut" }}
                  height={h}
                  y={(size.height / strokes) * i}
                  fill="white"
                />
              ))}
            </mask>
          </defs>

          <image
            href={image}
            width="100%"
            height="100%"
            x={0}
            y={0}
            mask={`url(#stroke-mask-${instanceId}-final)`}
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Individual animated brush strokes as masks */}
          {brushElements}

          {/* Final fade-in full image for clarity */}
          {showFull && (
            <motion.image
              href={image}
              width="100%"
              height="100%"
              x={0}
              y={0}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              preserveAspectRatio="xMidYMid meet"
            />
          )}
        </svg>
      )}
    </div>
  );
};

export default BrushRevealImage;
