"use client";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // بالمللي ثانية
}

const Counter: React.FC<CounterProps> = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = end / (duration / 16); // 16ms ≈ 60fps

          const updateCounter = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

export default Counter;
