import { useEffect, useState } from 'react';

export function useTypingText(
  phrases: string[],
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 1600,
): { text: string; isDeleting: boolean } {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (index >= phrases.length) {
      setIndex(0);
      return;
    }

    const current = phrases[index];

    if (!isDeleting && subIndex === current.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index, phrases, typeSpeed, deleteSpeed, pauseTime]);

  return { text: phrases[index]?.substring(0, subIndex) ?? '', isDeleting };
}
