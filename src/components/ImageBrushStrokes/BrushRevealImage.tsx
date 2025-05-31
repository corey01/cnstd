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
  const instanceId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -20% 0px",
  });

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [showFull, setShowFull] = useState(false);

  // Track container size
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSize({ width, height });
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setShowFull(true), duration * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, duration]);

  const randomBrushData = useMemo(() => {
    if (!size.width || !size.height) return [];

    return Array.from({ length: strokes }).map((_, i) => {
      const bandHeight = size.height / strokes;
      const baseY = bandHeight * i;
      const w = size.width * 1.2;
      const h = bandHeight * 1.2;
      const y =
        baseY + (bandHeight - h) / 2 + Math.random() * (bandHeight - h) * 0.2;
      const direction = i % 2 === 0 ? 1 : -1;
      const delay = (duration / strokes) * i;
      return { i, w, h, y, direction, delay };
    });
  }, [size, strokes, duration]);

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
            <mask id={`stroke-mask-${instanceId}`}>
              <rect width="100%" height="100%" fill="black" />
              {isInView &&
                randomBrushData.map(({ i, w, h, y, direction, delay }) => (
                  <motion.rect
                    key={i}
                    initial={
                      direction === 1 ? { width: 0, x: 0 } : { width: 0, x: w }
                    }
                    animate={{ width: w, x: 0 }}
                    transition={{ delay, duration: 0.5, ease: "easeOut" }}
                    height={h}
                    y={y}
                    fill="white"
                  />
                ))}
            </mask>
          </defs>

          {/* Image with mask that reveals it via brush strokes */}
          <image
            href={image}
            width="100%"
            height="100%"
            mask={`url(#stroke-mask-${instanceId})`}
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Final fade-in full image, if desired */}
          {showFull && (
            <motion.image
              href={image}
              width="100%"
              height="100%"
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
