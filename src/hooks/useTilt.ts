import { useCallback, useRef, useState } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

export function useTilt(maxTilt = 12) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setTilt({ rotateX, rotateY, glareX, glareY });
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}
